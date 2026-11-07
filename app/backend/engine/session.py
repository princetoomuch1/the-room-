"""Game session and room runner: two-token system, CALL system, hidden objections, boomerang,
integrity, skull debt, content warnings, Mirror construction and debrief."""
from __future__ import annotations

import copy
import random
import re
import uuid
from dataclasses import dataclass, field

from . import effect as fx
from .conditions import evaluate
from .content import load_npc, load_room
from .traits import starting_state

REASON_MARKERS = ["because", "but ", "the thing is", "last time", "i just", "it's a principle", "anyway"]
PRONOUNS = [(r"\bI'm\b", "you're"), (r"\bI\b", "you"), (r"\bmy\b", "your"), (r"\bme\b", "you"),
            (r"\bmyself\b", "yourself"), (r"\bMy\b", "Your")]
ROOM_ORDER = ["room1_kitchen", "room2_desk", "room3_table", "room4_deposit", "room5_meeting",
              "room6_client", "room7_fund", "room8_board", "war_room", "room9_mirror"]


def flip_pronouns(text: str) -> str:
    out = text
    for pat, rep in PRONOUNS:
        out = re.sub(pat, rep, out)
    return out


def has_reason(text: str) -> bool:
    t = text.lower()
    return any(m in t for m in REASON_MARKERS)


@dataclass
class Game:
    mode: str = "medium"
    seed: int = 0
    integrity: int = 10
    wariness: dict = field(default_factory=dict)          # npc_id -> flags
    skull_debt: list = field(default_factory=list)
    history: dict = field(default_factory=dict)           # room_id -> list of chosen moves
    results: dict = field(default_factory=dict)           # room_id -> end
    calls_made: list = field(default_factory=list)        # npc names, in order
    ending_flags: set = field(default_factory=set)
    id: str = field(default_factory=lambda: uuid.uuid4().hex[:12])

    def __post_init__(self):
        self.rng = random.Random(self.seed)

    def global_wariness(self) -> int:
        return 2 if self.integrity <= 4 else (1 if self.integrity <= 7 else 0)

    def ending(self) -> str:
        if "scapegoat" in self.ending_flags:
            return "scapegoat"
        wins = sum(1 for e in self.results.values() if e in ("clean", "partial", "dark"))
        if self.integrity <= 4 and wins >= 5:
            return "operator"
        if "wall" in self.ending_flags:
            return "wall"
        clean_like = all(e in ("clean", "partial") for e in self.results.values()) and self.results
        if self.integrity >= 8 and clean_like:
            return "diplomat"
        return "wall_signed"


class RoomRun:
    def __init__(self, game: Game, room_id: str, room: dict | None = None):
        self.game = game
        self.room = room or load_room(room_id, game.mode)
        self.room_id = self.room["id"]
        self.node_id = self.room["start"]
        self.turn = 0
        self.insight = 6
        self.player_certainty = 50.0
        self.revealed: set = set()
        self.flags: set = set()
        self.cards: set = set()
        self.presented: list = []
        self.tells_active: dict = {}       # tell_id -> (tell, expires_turn)
        self.tells_clicked: set = set()
        self.tactics_seen: set = set()
        self.weakened: dict = {}
        self.repeat: dict = {}
        self.reasons_given = 0
        self.boost_next = 1.0
        self.tokens: dict = {}
        self.ended = False
        self.end = None
        self.content_note = False
        self.log: list = []
        self.npcs = {}
        overrides = self.room.get("npc_trait_overrides", {})
        for nid in self.room.get("npcs", []):
            npc = load_npc(nid)
            traits = {**npc.get("traits", {}), **overrides.get(nid, {})}
            st = starting_state(traits)
            st["trust"] -= 10 * game.global_wariness() + 5 * game.wariness.get(nid, 0)
            self.npcs[nid] = {"npc": npc, "state": st}
        ms = self.room.get("state", {})
        self.mirror_leverage = float(ms.get("mirror_leverage", 50))
        if "player_certainty" in ms:
            self.player_certainty = float(ms["player_certainty"])
        self._enter(self.node_id)

    # ----- condition context -------------------------------------------------
    def primary(self) -> str | None:
        return next(iter(self.npcs), None)

    def value(self, name: str) -> float:
        if name == "turn":
            return self.turn
        if name == "insight":
            return self.insight
        if name == "reactance":
            return max(self.repeat.values(), default=0) * 0.3
        nid = self._focus_npc()
        return float(self.npcs[nid]["state"].get(name, 0)) if nid else 0.0

    def hand_is(self, kind: str) -> bool:
        spec = self.room.get(f"{kind}_hand")
        if not spec:
            return False
        p = set(self.presented)
        if not set(spec.get("requires_all", [])) <= p:
            return False
        if spec.get("requires_one_of") and not p & set(spec["requires_one_of"]):
            return False
        if spec.get("and_flag") and spec["and_flag"] not in self.flags:
            return False
        return True

    def mirror_win(self) -> bool:
        diff = self.player_certainty - self.mirror_leverage
        return (diff > 0 and self.reasons_given == 0) or diff >= 30

    def _focus_npc(self, node: dict | None = None) -> str | None:
        node = node or self.node
        sp = node.get("speaker")
        return sp if sp in self.npcs else self.primary()

    # ----- nodes ---------------------------------------------------------------
    @property
    def node(self) -> dict:
        return self.room["nodes"][self.node_id]

    def _resolve_line(self, node: dict) -> tuple[str, dict]:
        if "line_by_state" in node:
            for opt in node["line_by_state"]:
                if opt.get("else") or evaluate(opt.get("if"), self):
                    return opt.get("line", ""), opt
        if "slot" in node:
            return self._mirror_line(node), {}
        return node.get("line", ""), {}

    def _enter(self, nid: str):
        self.node_id = nid
        node = self.node
        if "branch_by_state" in node:
            for opt in node["branch_by_state"]:
                if opt.get("else") or evaluate(opt.get("if"), self):
                    return self._enter(opt["goto"])
        if "end" in node or "end_by_state" in node:
            return self._finish(node)
        line, opt = self._resolve_line(node)
        self.current_opt = opt
        for src in (node, opt):
            if src.get("reveals"):
                self.revealed.add(src["reveals"])
            if src.get("grants_card"):
                self.cards.add(src["grants_card"])
            if src.get("issues_token"):
                self.tokens[self._focus_npc(node)] = src["issues_token"]
            if src.get("sets_flag"):
                self.flags.add(src["sets_flag"])
        if node.get("ending_flag"):
            self.game.ending_flags.add(node["ending_flag"])
        for tell in node.get("tells", []) or []:
            if evaluate(tell.get("condition"), self):
                self.tells_active[tell["id"]] = (tell, self.turn + int(tell.get("window", 3)))
                if tell.get("tactic"):
                    self.tactics_seen.add(tell["tactic"])
        if self.room.get("crisis_resources_visible") or node.get("crisis_resources_visible"):
            self.content_note = True
        self.current_line = line

    def view(self) -> dict:
        node = self.node
        choices = [self._public_choice(c) for c in self._available_choices()]
        return {
            "room": self.room_id, "title": self.room.get("title"), "mode": self.room.get("mode"),
            "node": self.node_id, "speaker": node.get("speaker"), "line": getattr(self, "current_line", ""),
            "turn": self.turn, "insight": self.insight,
            "tells": [{"id": t["id"], "anchor": t.get("anchor"), "cost": t.get("insight_cost", 1)}
                      for t, exp in self.tells_active.values() if exp >= self.turn and t["id"] not in self.tells_clicked],
            "choices": choices, "ended": self.ended, "end": self.end,
            "crisis_resources_visible": self.content_note,
            "content_note": self.room.get("content_note") if self.turn == 0 else None,
        }

    def _expand_ref(self, c: dict) -> list[dict]:
        ref = c.get("ref")
        if not ref:
            return [c]
        if ref == "B":
            b = copy.deepcopy(self.room["boundary_choice"])
            b["next"] = c.get("next")
            return [b]
        if ref == "R":
            r = copy.deepcopy(self.room["reason_choice_template"])
            r.update({"text": c["text"], "next": c.get("next")})
            return [r]
        if ref == "C":
            return [copy.deepcopy(self.room["concede_choice"])]
        if ref == "CALL":
            tactic = getattr(self, "current_tactic", None)
            text = c.get("text_by_tactic", {}).get(tactic)
            if tactic and text and self._tell_clicked_for_tactic(tactic):
                return [{"id": f"call_{tactic}", "text": text, "type": "call", "calls_tactic": tactic,
                         "truthful": True, "preserves_refusal": True, "next": c.get("next")}]
            return []
        return [c]

    def _tell_clicked_for_tactic(self, tactic: str) -> bool:
        return any(t.get("tactic") == tactic for t, _ in self.tells_active.values()
                   if t["id"] in self.tells_clicked)

    def _available_choices(self) -> list[dict]:
        out = []
        opt = getattr(self, "current_opt", {}) or {}
        if not self.node.get("choices") and opt.get("next"):
            return [{"id": "continue", "text": "[continue]", "type": "silence", "truthful": True, "turn_cost": 0,
                     "preserves_refusal": True, "next": opt["next"]}]
        for raw in self.node.get("choices", []) or []:
            for c in self._expand_ref(raw):
                if not evaluate(c.get("condition"), self):
                    continue
                if c.get("requires_tell") and c["requires_tell"] not in self.tells_clicked:
                    continue
                if c.get("requires_flag") and c["requires_flag"] not in self.flags:
                    continue
                out.append(c)
        return out

    @staticmethod
    def _public_choice(c: dict) -> dict:
        skull = bool(c.get("skull")) or not (c.get("truthful", True) and c.get("preserves_refusal", True))
        return {"id": c["id"], "text": c.get("text"), "type": c.get("type"), "skull": skull,
                "strong": bool(c.get("strong")), "action": c.get("action"), "max_cards": c.get("max_cards")}

    # ----- player actions ------------------------------------------------------
    def click_tell(self, tell_id: str) -> dict:
        tell, exp = self.tells_active.get(tell_id, (None, -1))
        cost = tell.get("insight_cost", 1) if tell else 0
        if "fatima_marked" in self.flags:
            cost *= 2
        if not tell or exp < self.turn or self.insight < cost:
            return {"ok": False}
        self.insight -= cost
        self.tells_clicked.add(tell_id)
        return {"ok": True, "reading": tell.get("reading"), "false_positive": tell.get("false_positive"),
                "tactic": tell.get("tactic")}

    def examine(self, object_id: str, look: int = 1) -> dict:
        obj = next((o for o in self.room.get("objects", []) if o["id"] == object_id), None)
        if not obj:
            return {"ok": False}
        src = obj
        if "looks" in obj:
            src = next((l for l in obj["looks"] if l["n"] == look), obj["looks"][-1])
        cost = src.get("insight_cost", obj.get("insight_cost", 0))
        if self.insight < cost:
            return {"ok": False}
        self.insight -= cost
        if src.get("grants_card"):
            self.cards.add(src["grants_card"])
        if src.get("sets_flag") or obj.get("sets_flag"):
            self.flags.add(src.get("sets_flag") or obj.get("sets_flag"))
        if src.get("grants_tell") or obj.get("grants_tell"):
            self.tells_clicked.add(src.get("grants_tell") or obj.get("grants_tell"))
        self.flags.add(f"examined:{object_id}")
        return {"ok": True, "text": src.get("text") or obj.get("reveals_text"), "card": src.get("grants_card")}

    def choose(self, choice_id: str, cards: list[str] | None = None) -> dict:
        if self.ended:
            return self.view()
        choice = next((c for c in self._available_choices() if c["id"] == choice_id), None)
        if choice is None:
            raise ValueError(f"choice {choice_id} not available at {self.node_id}")
        node = self.node
        target = choice.get("npc") or self._focus_npc(node)
        self._record(choice)
        if choice.get("action") == "present_evidence":
            self._present(cards or [], choice)
        elif self.room_id == "room9_mirror":
            self._apply_mirror(choice)
        elif node.get("speaker") != "architect" and target in self.npcs:
            self._apply(choice, target)
        self.turn += int(choice.get("turn_cost", 1))
        if choice.get("sets_flag"):
            self.flags.add(choice["sets_flag"])
        if choice.get("grants_card"):
            self.cards.add(choice["grants_card"])
        if choice.get("reveals"):
            self.revealed.add(choice["reveals"])
        if choice.get("offers_refusal"):
            self.flags.add("offered_refusal")
        nxt = choice.get("next")
        if choice.get("type") == "concession":
            nxt = nxt or "end_loss"
        forced = self._clock_event()
        if forced and not str(nxt).startswith("end"):
            nxt = forced
        if self.room.get("turn_limit") and self.turn >= self.room["turn_limit"] and not str(nxt).startswith("end"):
            nxt = "end_partial" if self.npcs[self.primary()]["state"]["trust"] >= 50 else "end_loss"
        self._enter(nxt)
        return self.view()

    def _clock_event(self) -> str | None:
        for ev in (self.room.get("clock") or {}).get("events", []):
            key = f"clock:{ev['event']}"
            if self.turn >= ev["at_turn"] and key not in self.flags:
                self.flags.add(key)
                return ev["goto"]
        return None

    def _record(self, choice: dict):
        text = choice.get("text") or ""
        skull = bool(choice.get("skull"))
        reason = "reason" in (choice.get("tags") or []) or has_reason(text)
        self.game.history.setdefault(self.room_id, []).append(
            {"text": text, "type": choice.get("type"), "tactic": choice.get("tactic"),
             "skull": skull, "reason": reason, "strong": bool(choice.get("strong"))})

    def _apply(self, choice: dict, target: str):
        st = self.npcs[target]["state"]
        f = st["_factors"]
        mtype = choice.get("type", "")
        self.repeat[mtype] = self.repeat.get(mtype, 0) + 1
        is_skull = bool(choice.get("skull")) or not (choice.get("truthful", True) and choice.get("preserves_refusal", True))

        if mtype == "call":
            return self._apply_call(choice, target)

        detected = False
        if is_skull:
            self.game.integrity -= int(choice.get("integrity_cost", 1))
            wf = self.game.wariness.get(target, 0) + self.game.global_wariness()
            detected = self.game.rng.random() < fx.p_detect(f, wf)
            debt = choice.get("skull_debt")
            if debt:
                self.game.skull_debt.append({**debt, "room": self.room_id, "npc": target})
            if choice.get("vulnerable_target"):
                self.content_note = True

        revealed_any = bool(self.revealed)
        objective = {"stated": fx.STATED_MULT, "hidden": fx.HIDDEN_MULT if revealed_any else 1.0}.get(
            choice.get("targets"), 1.0)
        weaken = self.weakened.get(choice.get("tactic"), 1.0)
        res = fx.compute_effect(choice, f, st, self.player_certainty, self.repeat[mtype],
                                detected_skull=detected, objective_mult=objective, tactic_weaken=weaken)
        e = res.effect * (self.boost_next if not is_skull else 1.0)
        self.boost_next = 1.0

        if choice.get("strong") and choice.get("rebuttal") and not self.revealed:
            if choice["rebuttal"].get("weak"):
                st["certainty"] -= fx.WEAK_REBUTTAL_DOWN
                self.boost_next = 1.5
            else:
                st["certainty"] += fx.BOOMERANG_UP
                st["resistance"] += 10
                e = min(e, 0.0)

        st["resistance"] = fx.clamp(st["resistance"] - e)
        st["trust"] = fx.clamp(st["trust"] + 0.4 * e)
        if detected:
            st["trust"] = fx.clamp(st["trust"] - fx.BIG_TRUST_HIT)
            for contact in self.npcs[target]["npc"].get("contacts", []):
                self.game.wariness[contact] = self.game.wariness.get(contact, 0) + 1
        for k, v in (choice.get("deltas") or {}).items():
            st[k] = fx.clamp(st.get(k, 0) + v)
        for nid, d in (choice.get("deltas_npc") or {}).items():
            if nid in self.npcs:
                for k, v in d.items():
                    self.npcs[nid]["state"][k] = fx.clamp(self.npcs[nid]["state"].get(k, 0) + v)
        if choice.get("ego_threat") and self.room.get("ego_threat", {}).get("enabled"):
            for k, v in self.room["ego_threat"]["on_trigger"].items():
                st[k] = fx.clamp(st.get(k, 0) + v)
            self.flags.add("ego_threat_triggered")
        self.log.append({"turn": self.turn, "choice": choice["id"], "effect": round(e, 2),
                         "reactance": round(res.reactance, 2), "detected": detected, "skull": is_skull})

    def _apply_call(self, choice: dict, target: str):
        tactic = choice.get("calls_tactic")
        correct = tactic in self.tactics_seen or tactic in ("own_pressure",) or tactic == getattr(self, "current_tactic", None)
        st = self.npcs[target]["state"] if target in self.npcs else None
        if correct:
            self.insight += fx.CALL_INSIGHT
            self.weakened[tactic] = fx.CALL_WEAKEN
            self.player_certainty += 10
            self.flags.add(f"call:{tactic}")
            npc_name = (self.npcs.get(target, {}).get("npc", {}) or {}).get("name", target)
            self.game.calls_made.append(npc_name)
        elif st is not None:
            hit = fx.CALL_WRONG_TRUST * (2 if "fatima_marked" in self.flags else 1)
            st["trust"] = fx.clamp(st["trust"] - hit)
        for k, v in (choice.get("deltas") or {}).items():
            if st is not None:
                st[k] = fx.clamp(st.get(k, 0) + v)
        for nid, d in (choice.get("deltas_npc") or {}).items():
            if nid in self.npcs:
                for k, v in d.items():
                    self.npcs[nid]["state"][k] = fx.clamp(self.npcs[nid]["state"].get(k, 0) + v)
        self.log.append({"turn": self.turn, "choice": choice["id"], "call": tactic, "correct": correct})

    def _present(self, cards: list[str], choice: dict):
        max_cards = int(choice.get("max_cards", 3))
        valid = [c for c in cards if c in self.cards][:max_cards]
        self.presented = valid
        if "card_clock" in valid and "fatima_sheikh" in self.npcs:
            st = self.npcs["fatima_sheikh"]["state"]
            st["trust"] = fx.clamp(st["trust"] - 10)

    # ----- Mirror --------------------------------------------------------------
    def _mirror_line(self, node: dict) -> str:
        slot = node["slot"]
        src_room = self.room["construction"]["source_rooms"][slot["source"]]
        hist = self.game.history.get(src_room, [])
        pick = None
        for pri in self.room["construction"]["selection_priority"]:
            cands = [h for h in hist if (pri == "any") or h.get(pri)]
            if cands:
                pick = cands[-1]
                break
        prefix = ""
        if node.get("pre_line_if_reason_stored") and self.game.history.get("_mirror_reasons"):
            prefix = flip_pronouns(self.game.history["_mirror_reasons"][-1]) + " "
        mult = 1.0
        if pick and pick["text"]:
            line = flip_pronouns(pick["text"]) + " Sign it."
            self.current_tactic = pick.get("tactic") or slot.get("default_tactic")
            if pick.get("skull"):
                mult = float(self.room.get("construction_overrides", {}).get("skull_line_multiplier", 1.25))
        else:
            line = slot["default"]
            self.current_tactic = slot.get("default_tactic")
            mult = float(self.room.get("construction", {}).get("empty_history_multiplier", 0.6))
        tactic = self.current_tactic
        if tactic:
            self.tactics_seen.add(tactic)
            tid = f"t_mirror_{node.get('slot', {}).get('source')}"
            self.tells_active[tid] = ({"id": tid, "anchor": "line", "tactic": tactic, "insight_cost": 1,
                                       "reading": f"Your own line, used as {tactic.replace('_', ' ')}.",
                                       "false_positive": "It's a fair point, in another room."},
                                      self.turn + (1 if self.room.get("mode") != "medium" else 2))
        self.mirror_leverage += 10 * mult * self.weakened.get(tactic, 1.0)
        return prefix + line

    def _apply_mirror(self, choice: dict):
        t = choice.get("type")
        if t == "boundary":
            self.player_certainty += 10
            n = self.repeat.get("boundary", 0) + 1
            self.repeat["boundary"] = n
            if n > 1:
                self.mirror_leverage *= 0.75
        elif t == "refusal":
            self.player_certainty += 3
            self.mirror_leverage += 8
            self.reasons_given += 1
            self.game.history.setdefault("_mirror_reasons", []).append(choice.get("text", ""))
        elif t == "call":
            tactic = choice.get("calls_tactic")
            if tactic and tactic == getattr(self, "current_tactic", None):
                self.player_certainty += 10
                self.weakened[tactic] = fx.CALL_WEAKEN
                self.mirror_leverage -= 5
                self.flags.add(f"call:{tactic}")
                self.flags.add("mirror_call_correct")
                self.game.calls_made.append("the Mirror")
            else:
                self.player_certainty -= 10

    # ----- end and debrief -----------------------------------------------------
    def _requirements_met(self) -> bool:
        for req in self.room.get("clean_requires", []) or []:
            if req == "at_least_two_correct_calls":
                if sum(1 for f in self.flags if f.startswith("call:")) < 2:
                    return False
            elif req not in self.flags:
                return False
        return True

    def _finish(self, node: dict):
        end = node.get("end")
        if "end_by_state" in node:
            for opt in node["end_by_state"]:
                if opt.get("else") or evaluate(opt.get("if"), self):
                    end = opt["end"]
                    break
        if end == "clean" and not self._requirements_met():
            end = "partial"
        if node.get("ending_flag"):
            self.game.ending_flags.add(node["ending_flag"])
        if node.get("content_note"):
            self.content_note = True
        self.ended = True
        self.end = end
        self.current_line = node.get("architect", "Room closed.")
        self.game.results[self.room_id] = end
        for nid, rec in self.npcs.items():
            self.tokens.setdefault(nid, fx.token_for(rec["state"]))

    def debrief(self) -> dict:
        d = self.room.get("debrief", {})
        hidden = d.get("hidden_objection")
        hidden = hidden if isinstance(hidden, list) else ([hidden] if hidden else [])
        layers = [l["id"] for l in self.room.get("hidden_objection_layers", [])]
        aw = d.get("afterword") or {}
        line = aw.get(self.end) if aw else None
        return {
            "room": self.room_id, "end": self.end,
            "missed_tells": [t for t in d.get("tells", []) if t not in self.tells_clicked],
            "hidden_not_surfaced": [l for l in layers if l not in self.revealed],
            "tokens": self.tokens,
            "afterword": {"speaker": aw.get("speaker"), "to": aw.get("to"), "line": line}
            if line else {"note": aw.get("dark_note") if aw else None},
            "cards_gathered": sorted(self.cards) if d.get("show_cards_gathered") else None,
            "crisis_resources_visible": self.content_note,
            "integrity_now_hidden": True,
        }
