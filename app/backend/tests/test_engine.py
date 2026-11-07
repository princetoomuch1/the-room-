import json
import sys
from datetime import date
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from engine import effect as fx  # noqa: E402
from engine.content import CONTENT_DIR, crisis_resources, load_room, list_rooms  # noqa: E402
from engine.session import Game, RoomRun  # noqa: E402
from engine.traits import STANDARD, ALL_TRAITS, factors  # noqa: E402


# ---------- formula ----------------------------------------------------------------
def test_formula_exact():
    f = factors({"A": 50, "N": 50, "O": 50, "IQ": 50})
    st = {"trust": 50, "fatigue": 0}
    move = {"type": "evidence"}
    r = fx.compute_effect(move, f, st, 50, 1)
    expected = fx.base("evidence") * fx.trait_mult(f, "evidence") * fx.state_mod(st, "evidence", 50) - 0.0
    assert r.effect == pytest.approx(expected)
    assert r.reactance == 0.0


def test_reactance_scales_with_repeat():
    f = factors({})
    move = {"type": "pressure"}
    r1 = fx.reactance(move, f, 1)
    r3 = fx.reactance(move, f, 3)
    assert r3 == pytest.approx(3 * r1)
    assert r1 == pytest.approx(0.9 * (1 + fx.trait_reactance(f)))


def test_detected_skull_is_negative():
    f = factors({})
    r = fx.compute_effect({"type": "flattery"}, f, {"trust": 50}, 50, 1, detected_skull=True)
    assert r.effect <= 0


def test_empathy_near_zero_for_psychopathy():
    cold = factors({"psych": 95, "callousness": 98})
    warm = factors({"A": 80, "N": 70, "psych": 10})
    assert fx.trait_mult(cold, "empathy") < 0.1 < fx.trait_mult(warm, "empathy")


def test_token_rule():
    assert fx.token_for({"trust": 60, "fear": 35}) == "agreement"
    assert fx.token_for({"trust": 59, "fear": 10}) == "compliance"
    assert fx.token_for({"trust": 90, "fear": 36}) == "compliance"


def test_trait_counts():
    assert len(STANDARD) == 104
    assert len(ALL_TRAITS) == 114


# ---------- content integrity --------------------------------------------------------
@pytest.mark.parametrize("room_id", list_rooms())
@pytest.mark.parametrize("mode", ["medium", "hard", "brutal"])
def test_every_next_exists(room_id, mode):
    room = load_room(room_id, mode)
    nodes = room["nodes"]
    refs = {"B", "R", "C", "CALL"}
    for nid, node in nodes.items():
        for c in node.get("choices", []) or []:
            nxt = c.get("next")
            if c.get("ref") == "C" and not nxt:
                continue
            assert nxt in nodes, f"{room_id}/{mode}: {nid}.{c.get('id', c.get('ref'))} -> {nxt}"
        for opt in node.get("branch_by_state", []) or []:
            assert opt["goto"] in nodes
    for ev in (room.get("clock") or {}).get("events", []):
        assert ev["goto"] in nodes


def test_brutal_removes_false_positives():
    room = load_room("room1_kitchen", "brutal")
    for node in room["nodes"].values():
        for t in node.get("tells", []) or []:
            assert "false_positive" not in t
            assert t["window"] == 1


def test_hard_overlay_adds_call_and_shortens_windows():
    room = load_room("room1_kitchen", "hard")
    ids = [c["id"] for c in room["nodes"]["a1"]["choices"]]
    assert "a1_call_home" in ids
    assert all(t["window"] <= 1 for t in room["nodes"]["a1"]["tells"])


# ---------- playthroughs -------------------------------------------------------------
def play(run, *choices):
    for c in choices:
        run.choose(c)
    return run


def test_room1_clean_path_medium():
    g = Game(mode="medium", seed=1)
    run = play(RoomRun(g, "room1_kitchen"), "a1b", "a3b", "a4a")
    assert "last_person" in run.revealed
    play(run, "a5b", "a6b", "a7b")
    assert run.ended and run.end == "clean"
    assert "photograph" in run.revealed
    assert g.integrity == 10


def test_room1_hard_clean_requires_call():
    g = Game(mode="hard", seed=1)
    run = play(RoomRun(g, "room1_kitchen"), "a1b", "a3b", "a4a", "a5b", "a6b", "a7b")
    assert run.end == "partial"  # no CALL on locative_evasion
    g2 = Game(mode="hard", seed=1)
    run2 = RoomRun(g2, "room1_kitchen")
    assert run2.click_tell("t_home")["ok"]
    play(run2, "a1_call_home")
    assert "call:locative_evasion" in run2.flags
    play(run2, "a4a", "a5b", "a6b", "a7b")
    assert run2.end == "clean"


def test_skull_costs_integrity_and_seeds_debt():
    g = Game(mode="medium", seed=3)
    run = play(RoomRun(g, "room1_kitchen"), "a1c", "a2c")
    assert g.integrity == 9
    assert run.end == "dark"
    assert any(d.get("retaliation_seed") == "anna_signs_formal_alibi" for d in g.skull_debt)
    assert g.history["room1_kitchen"][1]["skull"] is True


def test_wrong_call_costs_trust():
    g = Game(mode="hard", seed=1)
    run = RoomRun(g, "room2_desk")
    trust0 = run.npcs["gillian_pryce"]["state"]["trust"]
    run.tactics_seen.discard("authority_ploy")
    run._apply_call({"id": "x", "type": "call", "calls_tactic": "authority_ploy"}, "gillian_pryce")
    assert run.npcs["gillian_pryce"]["state"]["trust"] == pytest.approx(trust0 - 10)


def test_war_room_vulnerable_skull_ends_room():
    g = Game(mode="medium", seed=1)
    run = RoomRun(g, "war_room")
    play(run, "w0c", "h_priya", "p1c")
    assert run.ended and run.end == "loss" and run.content_note
    assert g.integrity == 8


def test_war_room_clean_path():
    g = Game(mode="medium", seed=7)
    run = RoomRun(g, "war_room")
    run.choose("w0b")                 # probe Meera
    run.choose("m1a" if "merger" in run.revealed else "m1c")
    run.examine("obj_log")
    run.examine("obj_bin")
    run.choose(run.view()["choices"][0]["id"]) if run.node_id == "m2" else None
    if run.node_id != "wr_hub":
        run.choose([c["id"] for c in run.view()["choices"]][0])
    play(run, "h_priya", "p1a", "p2a")
    assert "priya_2350" in run.revealed
    play(run, "p3a", "p4a", "h_karan")
    assert run.click_tell("t_k_anger")["ok"]
    play(run, "k1_deesc", "k2a")
    assert "karan_promise" in run.revealed, run.npcs["karan_sethi"]["state"]
    run.choose("k4a")
    while run.node_id != "f1":
        run.choose("h_objects")
    run.choose("f1a", cards=["card_priya_2350", "card_karan_promise", "card_bin"])
    assert run.node_id == "f2"
    run.choose("continue")
    assert run.node_id == "f3_clean"
    run.choose("f3a")
    assert run.end == "clean"
    assert run.tokens["meera_rao"] == "agreement"


def test_war_room_scapegoat_sets_ending():
    g = Game(mode="medium", seed=2)
    run = RoomRun(g, "war_room")
    run.examine("obj_log")
    play(run, "w0c", "h_daniel", "d1c", "d2a", "d3c", "d5a", "h_frame", "x1a", "x2a")
    assert run.end == "dark"
    assert g.ending() == "scapegoat"


def test_mirror_win_by_boundary_with_no_history():
    g = Game(mode="medium", seed=1)
    run = RoomRun(g, "room9_mirror")
    for _ in range(4):
        run.choose("B")
    play(run, "mw1", "mw2")
    assert run.end == "clean" and "wall" in g.ending_flags


def test_mirror_loss_by_reasons():
    g = Game(mode="medium", seed=1)
    g.history["room1_kitchen"] = [{"text": "They will find the discrepancy and then it is perjury.", "skull": True, "reason": False,
                                    "tactic": "false_consensus", "type": "social_proof", "strong": False}]
    run = RoomRun(g, "room9_mirror")
    for _ in range(4):
        rid = next(c["id"] for c in run.view()["choices"] if c["type"] == "refusal")
        run.choose(rid)
    assert run.node_id == "mr_lose"
    run.choose("ml1")
    assert run.end == "loss"


# ---------- safety -------------------------------------------------------------------
def test_crisis_registry_freshness():
    res = crisis_resources("IN", today=date(2026, 11, 8))
    assert res["entries"][0]["services"][0]["phone"] == "14416"
    old = crisis_resources(today=date(2027, 6, 1))
    assert set(old["stale_regions"]) == {"IN", "US", "GB"}


def test_war_room_has_content_note():
    room = load_room("war_room")
    assert room["content_note"]["required"] is True
    assert room["crisis_resources_visible"] is True
