"""Content store: loads rooms (base + hard overlay), NPCs, crisis registry."""
from __future__ import annotations

import copy
import json
import os
from datetime import date, datetime
from pathlib import Path

CONTENT_DIR = Path(os.environ.get("CONTENT_DIR", Path(__file__).resolve().parents[3] / "content"))


def _load(p: Path) -> dict:
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def merge_overlay(base: dict, overlay: dict) -> dict:
    """Apply a hard-mode overlay to a medium room. Rules:
    - patch_nodes.<id>.<field> replaces field; choices_add appends choices.
    - add_nodes inserts nodes; hidden_objection_layers_add appends layers.
    - tell_window_default sets window on every tell not explicitly patched.
    """
    room = copy.deepcopy(base)
    room["mode"] = overlay.get("mode", "hard")
    default_window = overlay.get("tell_window_default")
    if default_window is not None:
        for node in room["nodes"].values():
            for tell in node.get("tells", []) or []:
                tell["window"] = min(tell.get("window", 3), default_window)
    for nid, patch in (overlay.get("patch_nodes") or {}).items():
        node = room["nodes"].setdefault(nid, {})
        for k, v in patch.items():
            if k == "choices_add":
                node.setdefault("choices", []).extend(copy.deepcopy(v))
            else:
                node[k] = copy.deepcopy(v)
    for nid, node in (overlay.get("add_nodes") or {}).items():
        room["nodes"][nid] = copy.deepcopy(node)
    room.setdefault("hidden_objection_layers", []).extend(
        copy.deepcopy(overlay.get("hidden_objection_layers_add", [])))
    for key in ("clean_requires", "second_delayed_cost", "npc_trait_overrides", "clock",
                "inherit_skull_debt", "surprise_tactic", "state", "construction_overrides"):
        if key in overlay:
            room[key] = copy.deepcopy(overlay[key])
    if "debrief_add" in overlay:
        d = room.setdefault("debrief", {})
        d.setdefault("tells", []).extend(overlay["debrief_add"].get("tells", []))
    return room


def load_room(room_id: str, mode: str = "medium") -> dict:
    base = _load(CONTENT_DIR / "rooms" / f"{room_id}.medium.json")
    if mode == "medium":
        return base
    overlay_path = CONTENT_DIR / "rooms" / f"{room_id}.hard.json"
    room = merge_overlay(base, _load(overlay_path))
    if mode == "brutal":
        room["mode"] = "brutal"
        for node in room["nodes"].values():
            for tell in node.get("tells", []) or []:
                tell.pop("false_positive", None)
                tell["window"] = 1
    return room


def load_npc(npc_id: str) -> dict:
    p = CONTENT_DIR / "npcs" / f"{npc_id}.json"
    if p.exists():
        return _load(p)
    return {"id": npc_id, "traits": {}, "contacts": []}


def list_rooms() -> list[str]:
    return sorted({p.name.split(".")[0] for p in (CONTENT_DIR / "rooms").glob("*.medium.json")})


def crisis_resources(region: str | None = None, today: date | None = None) -> dict:
    reg = _load(CONTENT_DIR / "crisis_resources.json")
    today = today or date.today()
    entries = reg["entries"]
    if region:
        entries = [e for e in entries if e["region"] == region.upper()] or reg["entries"]
    stale = [e["region"] for e in reg["entries"]
             if (today - datetime.strptime(e["last_verified"], "%Y-%m-%d").date()).days > reg["max_age_days"]]
    return {"entries": entries, "stale_regions": stale, "max_age_days": reg["max_age_days"]}
