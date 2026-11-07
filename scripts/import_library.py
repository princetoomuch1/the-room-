#!/usr/bin/env python3
"""Import the 1,000-entry taxonomy (user Deliverable 1) into content/library/entries.json.

Usage: python scripts/import_library.py path/to/deliverable1.(json|csv) [--rooms room_links.csv]
Each row must provide: id, title, module, level, risk, summary, detection, counter.
Optional: rooms (semicolon-separated room ids), evidence_grade, sources (semicolon-separated).
Entries are validated against schemas/library_entry.schema.json. Nothing is invented: rows missing
required fields are reported and skipped.
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQ = ["id", "title", "module", "level", "risk", "summary", "detection", "counter"]


def rows(path: Path):
    if path.suffix == ".json":
        return json.loads(path.read_text(encoding="utf-8"))
    with open(path, newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    out, skipped = [], []
    for r in rows(Path(sys.argv[1])):
        missing = [k for k in REQ if not str(r.get(k, "")).strip()]
        if missing:
            skipped.append((r.get("id", "?"), missing))
            continue
        for k in ("rooms", "sources"):
            if isinstance(r.get(k), str):
                r[k] = [x.strip() for x in r[k].split(";") if x.strip()]
        r.setdefault("rooms", [])
        out.append(r)
    dest = ROOT / "content" / "library" / "entries.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"imported {len(out)}; skipped {len(skipped)}")
    for sid, miss in skipped[:20]:
        print(f"  skipped {sid}: missing {', '.join(miss)}")


if __name__ == "__main__":
    main()
