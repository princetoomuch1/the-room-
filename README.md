# Sovereign Mind: The Room

A painted dialogue-persuasion game about recognising manipulation and holding a boundary.

> Dirty tactics win rounds and lose games; recognition beats retaliation; a calm, repeated no beats the best argument.

## Contents, in the brief's execution order

1. `docs/01_design_bible.md` — Sections 0–11: decisions, visual identity, mechanics, the nine rooms, the War Room, the 22 archetypes (medium, hard, brutal), traits, the Mirror script, endings selection, Codex/Library/Debrief, safety and accessibility.
2. `docs/02_soul_sheets.md` — 26 Soul Sheets (21 archetype NPCs + the five people of the War Room).
3. `docs/03_painters_briefs.md` — 11 canvases: Antechamber, nine rooms, War Room.
4. `content/rooms/` — dialogue trees, JSON, medium base + hard overlay: Kitchen, Desk, Table, War Room, Mirror. Brutal is generated from hard.
5. `docs/05_trait_library.md` — 114 traits (104 standard + 10 custom-exclusive), four-column format.
6. `docs/06_endings.md` — The Diplomat, The Operator, The Wall, The Scapegoat.
7. `docs/07_implementation_spec.md` + `app/` + `schemas/` + `scripts/` — runnable Docker skeleton (FastAPI + React), engine, schemas with worked examples, CI scripts.
8. `docs/08_designers_note.md` — one page, to the team.

## Run

```bash
cd app && docker compose up --build    # http://localhost:8080
```

## Before release

- A person must verify each crisis line in `content/crisis_resources.json` against the provider's site and replace `PENDING_HUMAN_CHECK`.
- Import the Library from Deliverable 1 with `scripts/import_library.py`.
