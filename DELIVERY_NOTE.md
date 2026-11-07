# Delivery note — Sprint 1–3, WP-01 to WP-14

**Standing sentence:** the game's thesis is that dirty tactics win rounds and lose
games, recognition beats retaliation, and a calm repeated no beats the best
argument. Every packet below makes that sentence true in the code.

## Commands that produced this

    cd web
    bash tools/audit/run_all.sh        # 58 tests, 5 generated checks
    node tools/check_line_length.js
    node tools/character_audit.js
    node tools/svg_floor.js
    node tools/crisis_check.js
    node tools/a11y_check.js

Result: **AUDIT GREEN.**

## Kill criteria

| Criterion | Before | Now | Proof |
|---|---|---|---|
| Mirror beatable by reasons | FAIL | **PASS** | tests/test_mirror_reasons.js, 5 cases |
| Wound skull does not end the room | FAIL | **PASS** | tests/test_wound_skulls.js, 4 cases |
| Dark win rewarded without cost | MARGINAL FAIL | **PASS** | tests/test_skull_debt.js, 5 cases |
| Method information present | PASS | PASS | tools/crisis_check.js scans 7 files |
| Clean win unreachable | PASS | PASS | tests/test_endings.js |
| Mind score illegible | PASS | PASS | on screen every turn, plus the token line |
| Clock does nothing | PASS | PASS | gates two CALLs; freezes on the Wall |
| 2001 not planted before Room 4 | PASS | PASS | Room 1 photograph, Room 2 name, the scar |

## Bug log from the review

| # | Item | State | Closed by |
|---|---|---|---|
| 1 | Mirror clean win after feeding | CLOSED | v4 branches to v_cracked; engine assertion throws |
| 2 | Wound skull continues the room | CLOSED | engine rule plus content routing plus validator |
| 3 | Attention scaled with global insight | CLOSED | flat 4 / 3 / 2; tests/test_attention.js |
| 4 | No wrong CALL existed | CLOSED | six ungated CALLs, −10 trust, tell burns, ×1.25 pressure |
| 5 | CALLed tactics not weakened | CLOSED | weakened[] and ×0.25; tests/test_weaken.js |
| 6 | Hard mode cosmetic | CLOSED | shorter windows, one extra hidden layer per room, clean requires a CALL |
| 7 | Token invisible | CLOSED | debrief renders agreement or compliance with back-out odds |
| 8 | No crisis resources | CLOSED | Belgian lines on four screens, source-verified, dated |
| 9 | No per-room replay | OPEN | deliberately deferred; not in this sprint's scope |
| 10 | Turn limits unenforced | CLOSED | every room has a limit; stalling costs trust and fires one line |
| 11 | Boomerang unimplemented | CLOSED | certainty ±15 / −10 on strong moves and weak rebuttals |
| 12 | Zero accessibility | CLOSED | aria labels, aria-live, reduced motion, focus states, role=img |

## Content

- **Dialogue:** 61 NPC lines, median 16 words, longest 20, zero unmarked over 20.
  Was median 25 with 36 lines over the limit.
- **Soul Sheets:** Sluys, Spada and Marek written, ten fields each, three
  unswappable lines each.
- **Character audit, generated from content:** Anna 10/10, Joost 10/10,
  Mieke 10/10, Radu 10/10. Was Anna 4.5/10 and the others 3/10.
- **Art:** seven briefs written before any SVG work, then seven rooms repainted.
  Every room passes the complexity floor. The Mirror carries its own floor because
  its brief specifies no brushwork.

## One design collision found and resolved

WP-01 excludes a fed Mirror from Double Cross. The Chair, and therefore Double
Cross, was only reachable *through* feeding the Mirror. The two packets
contradicted each other, and the engine assertion caught it on the first full run.

Resolution: the seat is now also offered on the fed=0 path, gated on having played
the War Room triangle. The hardest ending is now a player who read every room,
crossed three men in one house, gave the Mirror nothing at all, and then sat down
in the chair with clear eyes. Double Cross additionally requires fed===0, and the
assertion remains as a backstop.

## Still open, declared

1. Per-room replay (bug 9). Not in scope.
2. The crisis registry reads
   `NUMBERS_SOURCE_VERIFIED_PENDING_HUMAN_SIGNOFF`. The four Belgian numbers were
   verified against the Brussels regional government catalogue and two independent
   sources on 2026-11-08, but the spec requires a human to sign off before the
   status becomes VERIFIED. That sign-off is yours.
3. De Vries and Emil still have no portraits of their own; Marek carries the War
   Room scene visually.

---

# Delivery note — Story context, WP-15 to WP-20

Command: `bash web/tools/audit/run_all.sh` → **AUDIT GREEN**, 17 test suites, 6 generated checks.
Real-browser check: `node web/tools/dom_playthrough.js clean|dirty` plays the actual page in jsdom,
title to ending, all 8 rooms and 7 corridors, zero runtime errors on both strategies.

## Story context (asked for first)
- Five "before" slides: February 2001 → 11 February → 2001–2026 → 28 October 21:20 → the call.
- Prologue "The Drive": Meera Rao on the phone, the photograph warning, the hidden ending
  ("You turned the car around.").
- Seven corridors between rooms, each sets a flag the next room reacts to.
- Story bible, dated, one page. `tools/check_story_consistency.js` checks 412 lines against it.
- Timeline fix: the bookkeeper is now missing at the start and is found dead between the Desk and
  the Table, so the Room 2 line really is the one that kills him.

## Added to the rooms
Memory nodes in six rooms; Lukas Vermeulen's phone call, photograph and unsent letter; Ines
Marchetti's earring and letter; the Greek. Every room has at least two conditional choices.

## Text system (WP-17)
Settle reveal with word anchors and punctuation pauses, three speeds (slow 1.82× normal),
eight FX tags with composition rules, breathing, scene title cards with gold rule and chime
(none for the Mirror), back-navigation with "You heard this already.", the Mirror in the
player's chosen hand with a reversed first line, synthesised per-NPC text sound (off by
default), and seven settings that persist: size, typeface, spacing, high contrast, reduced
motion, instant text, sound.

## Choices (WP-18)
Ten verbs on all 304 choices. EXIT costs 5 trust in the next room and nothing on the score.
Cards paginate at four with a drawn chevron; skull cards always last.

## Characters (WP-20)
Thirteen rigs. Pairwise silhouette distance all above 15%. One fidget, one breathing rate, one
blink rate each. Eight expressions including a flat lying face. A human moment per named
character that holds the choices for 2–4 seconds and cannot be skipped. De Vries, Emil, Meera,
the neighbour and the doorman now have faces. The War Room shows all three brothers.

## Still open, declared
1. Volume. Spec target is 264 nodes and ~62,000 words; the build is 140 nodes, 304 choices,
   ~6,100 words of authored text. That gap is writing, not engineering, and it is the next job.
2. Three clean paths per room (WP-18.4) and 4–8 choices per node are not yet met everywhere.
3. Twelve nodes still carry two skull choices; WP-18 wants one.
4. Crisis registry still needs your human sign-off.
5. Per-NPC voices are synthesised tones, not recorded samples.

---

# Delivery note — All eight rooms at full length

Command: `bash web/tools/audit/run_all.sh` → **AUDIT GREEN**, 18 suites, 6 generated checks.
Real page: `node web/tools/dom_playthrough.js clean|dirty`, all rooms and corridors, zero runtime errors.

| Room | Nodes / spec | Clean paths | Partial paths |
|---|---|---|---|
| Kitchen | 27 / 24 | 3+ | 2+ |
| Desk | 27 / 26 | 3+ | 2+ |
| Table | 27 / 26 | 3+ | 2+ |
| Deposit | 25 / 24 | 3+ | 2+ |
| Meeting | 29 / 28 | 3+ | 2+ |
| Fund | 26 / 26 | 3+ | 2+ |
| War Room | 33 / 32 | 3+ | 2+ |
| Mirror | 19 / 18 | 1 (thesis) | 1 |

Whole game: 244 nodes, 825 choices, 72 tells, ~9,800 words of authored text.
Every non-terminal node has 4 to 8 visible choices; no node offers more than one dirty move.
1,040 lines checked against the story bible with no contradiction. No NPC line over 20 words.

Still open: word count is ~9,800 against the spec's ~62,000. The node and choice targets are met;
the gap is the length of each line, which is held at 20 words by the house rule.
