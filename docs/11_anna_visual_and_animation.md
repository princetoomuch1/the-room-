# Anna Voss — visual brief

Painted from life, not from a turnaround sheet. Forty-seven, tired, handsome in a
way nobody has remarked on for some years. Dark hair going at the temple, pinned
up badly because she did it without a mirror.

**Posture.** Right of centre, back half-turned, weight on the left hip, the right
hand flat on the counter and carrying most of her. She does not move from this
spot for the whole room. Stillness is the pressure.

**Hands.** The most expressive part of her, and where the painting should take the
most time. She holds the cigarette the way you hold a tool, between the first two
joints, not between the fingertips. The other hand picks the ring up off the
counter and puts it down again without looking at it.

**The clothing that does not fit.** A man's cardigan, oatmeal, too big at the
shoulder, cuffs turned back twice. It is Voss's and she has not given it back. In
the dark ending she takes it off. In the clean ending she keeps it on.

**The tic.** Her thumb goes across the ring when she lies. It is never labelled,
never pointed at, and happens twice before the player can use it. On hard it
happens once.

**The eyes.** She does not meet the player's eyes at any point until the final
node, and when she does it is the signal that the next thing she says is true.
Nothing else on her face animates.

---

# The Kitchen — animation spec

Ninety per cent still. Movement is information, so it is rationed.

| Element | Frames | Timing | Meaning |
|---|---|---|---|
| Bulb | 3 (full, dim, full) | one flicker every 20 s, 160 ms total | the room's heartbeat |
| Rain on the window | 4, hand-drawn streaks | 2.4 s loop, offset per streak | the only weather you get |
| Cigarette smoke | 4 | 3.2 s loop, dies out when she sets it down | tells you the hand is occupied |
| Anna's eyes | 2 (open, shut) | blink every 4 to 6 s, random; looks away while lying; looks at the player once, on the last node | the most important animation in the game |
| Anna's hand | 1 move per node, maximum | 600 ms, eased, never repeated inside a node | the tell |
| Clock | second hand only | 1 s tick, continuous, audible | a presence, not a timer |
| Player's hands | none | appear at room open, resting, the scar visible | they move only when the player moves |

Nothing else animates. The background is a painting. Her body does not pace,
gesture or turn.

---

# The debrief overlay

Order, after the room closes:

1. Screen to black. Two seconds of nothing.
2. The tells the player missed appear one at a time as small painted vignettes,
   lower right: the thumb crossing the ring, the second cup upside down, the
   photograph on the fridge. Three seconds each. No text, no label, no arrow. The
   player has to recognise what they walked past.
3. The three parts of the score fade up: Insight, Craft, Edge.
4. One line under them: not everything in that room was measured.
5. The room's afterword, one sentence.
6. Close.

The clock is never explained. It runs four minutes slow in every room. By the
fourth room the player notices. By the seventh it is clear that somebody has been
setting it, and that it was never the player.
