#!/usr/bin/env python3
"""Quarterly crisis-resource check. Fails if any entry is older than max_age_days.
With --release, also fails on entries still marked PENDING_HUMAN_CHECK."""
import json
import sys
from datetime import date, datetime
from pathlib import Path

reg = json.loads((Path(__file__).resolve().parents[1] / "content" / "crisis_resources.json").read_text())
release = "--release" in sys.argv
bad = []
for e in reg["entries"]:
    age = (date.today() - datetime.strptime(e["last_verified"], "%Y-%m-%d").date()).days
    if age > reg["max_age_days"]:
        bad.append(f"{e['region']}: last verified {age} days ago")
    if release and e.get("verified_by") == "PENDING_HUMAN_CHECK":
        bad.append(f"{e['region']}: not yet checked by a person against {e['services'][0]['source']}")
print("\n".join(bad) or "crisis registry OK")
sys.exit(1 if bad else 0)
