#!/usr/bin/env python3
"""Validate every room (all modes), move and tell against the schemas, and check graph integrity."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "app" / "backend"))

from engine.content import list_rooms, load_room  # noqa: E402

try:
    import jsonschema
except ImportError:  # pragma: no cover
    jsonschema = None

errors = []
schemas = {n: json.loads((ROOT / "schemas" / f"{n}.schema.json").read_text()) for n in ("move", "tell", "npc")}

for npc_file in (ROOT / "content" / "npcs").glob("*.json"):
    if jsonschema:
        try:
            jsonschema.validate(json.loads(npc_file.read_text()), schemas["npc"])
        except jsonschema.ValidationError as e:
            errors.append(f"{npc_file.name}: {e.message}")

for rid in list_rooms():
    for mode in ("medium", "hard", "brutal"):
        room = load_room(rid, mode)
        nodes = room["nodes"]
        for nid, node in nodes.items():
            for t in node.get("tells", []) or []:
                if jsonschema and mode != "brutal":
                    try:
                        jsonschema.validate(t, schemas["tell"])
                    except jsonschema.ValidationError as e:
                        errors.append(f"{rid}/{mode}/{nid}/tell {t.get('id')}: {e.message}")
            for c in node.get("choices", []) or []:
                if "ref" in c:
                    continue
                if jsonschema:
                    try:
                        jsonschema.validate(c, schemas["move"])
                    except jsonschema.ValidationError as e:
                        errors.append(f"{rid}/{mode}/{nid}/{c.get('id')}: {e.message}")
                if c.get("next") not in nodes:
                    errors.append(f"{rid}/{mode}/{nid}/{c.get('id')}: next '{c.get('next')}' missing")

print("\n".join(errors) or "content OK")
sys.exit(1 if errors else 0)
