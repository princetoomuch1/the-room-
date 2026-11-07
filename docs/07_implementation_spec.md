# Implementation Spec

The repository ships a runnable skeleton: a FastAPI back-end that runs the engine against the JSON content store, and a React front-end that renders rooms, tells, choices, the evidence picker, the debrief, content notes and the crisis-resource panel. The engine implements the effect formula, the two-token system, CALL, hidden objections, the boomerang, integrity, skull debt and the Mirror's construction rule exactly as the design bible specifies. 34 engine tests pass, including full playthroughs of the Kitchen (medium and hard), the War Room's clean, scapegoat and vulnerable-target paths, and Mirror win and loss.

## 1. Run it

```bash
cd app
docker compose up --build
# front-end: http://localhost:8080   API: http://localhost:8000/docs
```

Without Docker:

```bash
cd app/backend && pip install -r requirements.txt && uvicorn main:app --reload
cd app/frontend && npm install && npm run dev     # proxies /api to :8000
```

Checks (run in CI on every push):

```bash
cd app/backend && pytest -q                       # engine + content integrity
python scripts/validate_content.py                # schemas + graph integrity, all modes
python scripts/lint_content.py                    # method-language block, AI-tell ban list, em-dash limit in game prose
python scripts/check_crisis_registry.py           # quarterly freshness
python scripts/check_crisis_registry.py --release # also fails on PENDING_HUMAN_CHECK entries
```

## 2. Layout

```
app/
  docker-compose.yml
  backend/
    main.py                 FastAPI routes
    engine/
      effect.py             the formula, detection, token rule, back-out odds
      traits.py             104 standard facets + 10 custom-exclusive; facet → factor collapse
      content.py            content store; hard-mode overlay merge; brutal transform; crisis registry
      conditions.py         condition mini-language used in content files
      session.py            Game (global state) and RoomRun (one room): all systems
    tests/test_engine.py
  frontend/                 React (Vite), nginx in production
content/
  rooms/*.medium.json       base trees
  rooms/*.hard.json         overlays (patch, add, shorten windows, add layers, clean requirements)
  npcs/*.json               trait vectors, contacts, soul-sheet pointer
  endings/*.json            selection rules and conditional lines (prose in docs/06_endings.md)
  crisis_resources.json     region registry, quarterly checked
  library/entries.json      created by scripts/import_library.py (not shipped)
schemas/                    JSON Schemas + worked examples
scripts/                    validate, lint, registry check, library import
docs/                       bible, soul sheets, briefs, traits, endings, this spec, designer's note
```

## 3. API

| Method | Path | Purpose |
|---|---|---|
| POST | `/games` `{mode, seed?}` | New game (medium, hard, brutal). Returns `game_id`, available rooms |
| POST | `/games/{id}/rooms/{room_id}` | Enter a room. Returns the first view (incl. `content_note` if required) |
| GET | `/games/{id}/room` | Current view |
| POST | `/games/{id}/choose` `{choice_id, cards?}` | Play a move; `cards` for the evidence action |
| POST | `/games/{id}/tells/{tell_id}` | Click a tell (costs Insight); returns both readings and the tactic |
| POST | `/games/{id}/objects/{object_id}?look=n` | Examine an object; may grant a card, flag or tell |
| GET | `/games/{id}/cards` | Evidence cards gathered in this room |
| GET | `/games/{id}/debrief` | Debrief after the room ends |
| GET | `/games/{id}/ending` | Ending selection + CALL list |
| GET | `/crisis-resources?region=IN` | Registry entries; stale regions flagged |
| GET | `/library?q=&module=&level=&risk=` | Library search (after import) |

The view never exposes trust, fear, resistance, integrity or tokens. The debrief exposes tokens. Integrity is never exposed.

## 4. The systems, as implemented

**Effect formula** (`effect.compute_effect`). `base(type) × trait_mult(NPC, type) × state_mod − reactance`, with `reactance = freedom_threat(move) × (1 + trait_reactance(NPC)) × repeat_count`. The result is then scaled by the stated/hidden objective multiplier (0.3 / 1.5), any CALL weakening (×0.25 on that tactic), and an authored `effect_multiplier` where a node needs one. A detected skull flips the sign. Positive effect lowers resistance and raises trust by 0.4 × effect.

**Detection.** `p = min(0.9, 0.15 + 0.004·comprehension + 0.003·mach + 0.1·wariness)`. On detection: trust −15 and +1 wariness on every NPC in the target's `contacts`. Integrity drops whether or not the skull is detected.

**Two tokens.** Nodes may issue a token explicitly (`issues_token`), as Priya's corridor testimony does. Otherwise the token is decided at room end per NPC: agreement if trust ≥ 60 and fear ≤ 35, else compliance. Compliance odds of backing out later: `0.35 + fear/200 − trust/300`. The player never sees tokens until the debrief.

**Tells and CALL.** Entering a node activates its tells with an expiry turn (`turn + window`). Clicking costs Insight (doubled if Fatima has marked the player). A clicked tell with a tactic unlocks CALL choices that declare `requires_tell`. A CALL is correct if its tactic has been seen in the room; correct CALLs add +2 Insight, weaken the tactic ×0.25 for the room, add +10 player certainty, set `call:<tactic>`, and append the NPC's name to the global CALL list (used by the Operator ending). Wrong CALLs cost 10 trust.

**Hidden objections.** Layers are revealed by authored `reveals` on lines, chosen by `line_by_state` against trust/fear/anger and flags. Moves tagged `targets: stated` land at 30%; `targets: hidden` land at 150% once any layer is revealed.

**Boomerang.** A `strong` move with an authored `rebuttal`, played before any layer is revealed: strong rebuttal raises NPC certainty +15 and resistance +10 and caps the move's effect at 0; weak rebuttal drops certainty −10 and gives the next truthful move ×1.5.

**Integrity and skull debt.** Integrity starts at 10, falls by each skull's `integrity_cost` (1, or 2 for vulnerable targets), and adds global wariness at ≤ 7 and ≤ 4 (−10 starting trust per flag). Skull debt entries carry `retaliation_seed`, `fires_in`, `reputation_hit`, `commitment_decay`; the room loader for the target room reads them (`inherit_skull_debt` in Room 3's overlay is the worked example).

**Hard and brutal.** `content.merge_overlay` applies `patch_nodes`, `choices_add`, `add_nodes`, extra hidden layers, `clean_requires`, trait overrides and the default tell window. Brutal strips `false_positive` from every tell and sets windows to 1. A clean end whose `clean_requires` are unmet resolves as partial.

**Content warnings and vulnerable targets.** Rooms with `content_note.required` return the note in the first view; the front-end shows a modal with the crisis panel and a skip route. Any choice flagged `vulnerable_target` sets the room's content flag and is authored to route to `end_debrief_vulnerable` or a named loss.

**Crisis registry.** `content/crisis_resources.json` holds per-region services, `last_verified`, `verified_by`. The API flags stale regions; CI fails if any entry is older than 100 days; release builds also fail while any entry is `PENDING_HUMAN_CHECK`. The three entries shipped carry the numbers given in the brief and **must be checked by a person against the providers' own sites before release**.

**Mirror.** The room declares source rooms per escalation. `RoomRun._mirror_line` picks the latest skull line, else reason line, else any line from that room's history, flips pronouns, appends "Sign it.", sets the tactic for CALL, and raises Mirror leverage (×1.25 for skull material in medium, ×1.5 in hard; ×0.6 for an empty history). Boundary repeats multiply leverage by 0.75; reasons add leverage and are stored so the next escalation opens with them. Win: certainty > leverage with zero reasons, or a margin ≥ 30.

## 5. Content schemas and worked examples

All schemas are JSON Schema 2020-12 in `schemas/`.

| Object | Schema | Worked example |
|---|---|---|
| Room | `room.schema.json` (+ `room_overlay.schema.json`) | `content/rooms/room1_kitchen.medium.json` and `.hard.json` |
| NPC | `npc.schema.json` | `schemas/examples/npc.example.json` (Hemant Joshi) |
| Move | `move.schema.json` | `schemas/examples/move.example.clean.json`, `move.example.skull.json` |
| Tell | `tell.schema.json` | `schemas/examples/tell.example.json` |
| Ending | `ending.schema.json` | `schemas/examples/ending.example.json` (The Scapegoat) |
| Library entry | `library_entry.schema.json` | `schemas/examples/library_entry.example.json` (illustrative shape only) |

The move schema enforces the spine: if `truthful` or `preserves_refusal` is false, `skull: true` and `integrity_cost` are required. There is no third category.

**Worked example: a skull move** (Room 1, `k2c`):

```json
{
  "id": "k2c",
  "text": "Aai already said you'd do it. She'll be hurt if you back out now.",
  "type": "social_proof", "truthful": false, "preserves_refusal": false,
  "skull": true, "tactic": "false_consensus", "integrity_cost": 1, "freedom_threat": 0.6,
  "deltas": { "fear": 15 },
  "skull_debt": { "retaliation_seed": "hemant_withdraws_guarantee", "fires_in": "room3_table", "reputation_hit": ["ramesh_deshpande"] },
  "next": "k9"
}
```

**Worked example: a tell** (Room 1, `t_after_week`):

```json
{
  "id": "t_after_week", "anchor": "phrase:After this week.", "indexes": "delay", "tactic": "delay",
  "window": 3, "insight_cost": 1,
  "reading": "A stall with no reason attached.",
  "false_positive": "Real caution. Guarantor papers are serious. Asking a CA is sensible."
}
```

**Worked example: an NPC** (`content/npcs/hemant_joshi.json`):

```json
{ "id": "hemant_joshi", "name": "Hemant Joshi", "archetype": "staller", "contacts": ["ramesh_deshpande"],
  "traits": { "C": 65, "N": 70, "E": 30, "A": 60, "trust": 55, "comprehension": 55, "liberty": 40, "cautiousness": 70, "shame_proneness": 70 },
  "soul_sheet": "docs/02_soul_sheets.md" }
```

**Worked example: an ending** (`content/endings/scapegoat.json`):

```json
{ "id": "scapegoat", "title": "The Scapegoat", "selection": { "priority": 1, "rule": "'scapegoat' in ending_flags" },
  "prose_ref": "docs/06_endings.md#the-scapegoat", "conditional_lines": [], "content_note": true, "crisis_resources_visible": true }
```

## 6. Adding a room

1. Write the medium tree against `room.schema.json`. Start from the Kitchen.
2. Write the hard overlay: shorten windows, add the hard hidden layer, the surprise tactic as a patched line with a new tell, the CALL as `choices_add` with `requires_tell`, `clean_requires`, `second_delayed_cost`.
3. Add NPC files with traits and contacts.
4. Add a playthrough test for clean, dark and loss.
5. Run validate, lint, pytest.

## 7. What the skeleton does not yet do

- Rooms 4 to 8 and the Corridor encounters are specified in the bible and Soul Sheets but have no JSON trees yet.
- Skull-debt events are stored; only Room 3's `inherit_skull_debt` is authored. A generic loader that fires `retaliation_seed` events at room start is the next engine task.
- The expression layer (LLM rendering within tell constraints) is not wired; all lines are authored text. If an LLM is added, it may only rephrase authored lines within the node's tell set, never add facts, and never run on the crisis corridor or the War Room.
- Persistence is in-memory. Swap `GAMES`/`RUNS` for Redis or Postgres before any public build.
- Painted assets are placeholders (CSS gradients).
