#!/usr/bin/env python3
"""Fail the build if any game content or doc contains self-harm method language, or banned AI-tell
phrases in game prose. The method list is deliberately category-level and maintained by content safety."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
METHOD_TERMS = [r"\boverdos\w*", r"\bligature", r"\bnoose", r"\bhanged\b", r"lethal dose", r"\bdosage\b",
                r"\bslit\b", r"\bwrists?\b", r"\bpoison\w*", r"\bfirearm", r"\bgunshot", r"jumped from"]
BANNED_PROSE = ["in a world where", "little did they know", "a testament to", "a tapestry of", "delve into",
                "navigate the complexities", "it's important to note", "in conclusion", "unlock the secrets",
                "resonate", "vibrant", "crucially"]
GAME_PROSE = ["docs/02_soul_sheets.md", "docs/06_endings.md", "docs/03_painters_briefs.md"]
ALLOW = {"docs/05_trait_library.md": [], "scripts/lint_content.py": METHOD_TERMS}

fail = []
for p in list((ROOT / "content").rglob("*.json")) + list((ROOT / "docs").glob("*.md")):
    rel = str(p.relative_to(ROOT))
    text = p.read_text(encoding="utf-8").lower()
    for pat in METHOD_TERMS:
        if re.search(pat, text):
            fail.append(f"{rel}: method term /{pat}/")
    if rel in GAME_PROSE:
        for b in BANNED_PROSE:
            if b in text:
                fail.append(f"{rel}: banned phrase '{b}'")
        for i, para in enumerate(p.read_text(encoding='utf-8').split("\n\n")):
            if para.count("—") > 1:
                fail.append(f"{rel}: paragraph {i} has {para.count(chr(8212))} em-dashes")
print("\n".join(fail) or "lint OK")
sys.exit(1 if fail else 0)
