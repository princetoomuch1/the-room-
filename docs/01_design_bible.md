# Sovereign Mind: The Room
## Design Bible v1.0

Built from: *Sovereign Mind: The Room, Design Research Dossier* (Nov 2026). Where this bible states a mechanic, the dossier holds the reason. Where this bible makes a choice the brief left open, the choice is marked **[DECISION]** with a one-line justification against the thesis.

> **The spine.** Dirty tactics win rounds and lose games. Recognition beats retaliation. A calm, repeated no beats the best argument.

---

## 0. Role, mandate, and the decisions this bible makes

Sovereign Mind is a dialogue-persuasion game in which the player walks through nine rooms and one locked room, each holding one or two people who want something from the player, or from whom the player wants something. The player wins rooms by reading people, surfacing what they actually need, naming tactics when they are used, and holding a boundary when the room tries to take it.

The game has one narrator, **the Architect**. The Architect is the voice that introduces each room, reads the debrief, and speaks the epilogues. The Architect is dry, exact, and never warm for long. It does not praise. It does not scold. It describes. It is the voice of a building that has watched many people pass through it.

Sample Architect lines:

- "Kitchen. Eleven at night. One bulb. Your uncle has been here since nine."
- "You got a yes. You did not get an agreement. He will remember the difference before you do."
- "Room closed."

**Decisions taken in this bible**

1. **[DECISION] War Room placement: between Room 8 and Room 9.** It is the last test of integrity before the Mirror, and every skull move made in it becomes Mirror material. An optional side-room would let a player skip the integrity test that the ending depends on.
2. **[DECISION] Corridor encounters.** Twelve archetypes in the dossier's cheat sheet do not have a numbered room (People-Pleaser, Frightened Yes, Hothead, Live Wire, Triangulator, Tag Team, Honest Skeptic, Literalist, Avoider, Clinger, Person in Crisis, and the Fund/Board archetypes' shadows). They appear as **Corridor encounters**: short, single-scene conversations between rooms, 3 to 6 exchanges long. They use the same engine and feed the Mirror. They are optional except the Person in Crisis, which is unskippable and arrives without warning after Room 6. Every one of them has a full Soul Sheet.
3. **[DECISION] "Ten rooms" for the painter's briefs** = the nine rooms, plus the **Antechamber** (the hub between rooms where the Codex, Library and Corridor doors live), plus the War Room.
4. **[DECISION] Arvind Sethi's death.** The cause of death is never stated in game text, codex, debrief or epilogue. No method, no means, no lethality appears anywhere. The pathologist's conclusion is referred to only as "the report." His staging does not succeed in any ending: in the clean path the truth surfaces and the insurer's exclusion applies; in the dark path the payout is frozen pending the police inquiry into Daniel. This follows safe-messaging practice (death by suicide is never shown as solving a problem). The War Room is preceded by a content note and an opt-out that routes the player to the Mirror with a neutral War Room state. Crisis resources are visible on every War Room screen.
5. **[DECISION] The player character.** The player is "you", unnamed, ungendered, born in Pune, educated in Manchester, working in London. Rooms 1 and 3 are set in Pune; Rooms 2 and 4 in Manchester; Rooms 5 to 8 and the War Room in London. The Mirror is nowhere. A coherent life makes the Mirror's collage of the player's words land harder: these are the rooms of one person's twenties and thirties.
6. **[DECISION] The 1,000-entry Library.** The user's Deliverable 1 (the taxonomy) and Deliverable 2 (five template entries) were not attached to this brief. This bible specifies the Library's schema, filters and room links (§10, and `schemas/library_entry.schema.json`) and ships an import script. It does not invent 1,000 entries. A fabricated taxonomy would be worse than an empty shelf.
7. **[DECISION] FORCES taxonomy.** The dossier could not verify a published source for FORCES. The game uses it as an internal tagging scheme on tactics (Frame, Obstruct, Ruse, Compel, Entangle, Seduce) and never presents it to players as research.
8. **[DECISION] Medium and hard dialogue trees** are stored as one base tree plus a hard-mode overlay that patches nodes. This keeps every branch present for both modes without duplicating 80% identical text, and makes the difference between modes auditable.
9. **[DECISION] "Brutal" mode** (removing false-positive flags, adding a hidden objection layer, hiding BATNA) is a toggle on top of hard, available only after one full clear.
10. **[DECISION] Section 11** of this bible, which the brief names but does not specify, is used for content safety, accessibility and the open production questions.

---

## 1. Visual identity: hand-painted, not generated

The game is painted. Not "painterly", not "stylised": painted, in oil, by people, on canvas that is then photographed at high resolution and composited by hand. Every room is a single canvas roughly 120 × 80 cm. Every NPC is painted from a sitter. Where a sitter is not available, the figure is not shipped.

**Light.** Rembrandt and Caravaggio. One source per room: a bulb, a window with bars of daylight, a banker's lamp, a pendant over a table. Faces come out of near-black. Half of every room sits in shadow, and the shadow is not empty, it is brown and red and full of furniture the player cannot quite see. The light source is always visible in frame or its shape is visible on a wall. Players should be able to say where the light is coming from in every room.

**The rooms.** Nine spaces the player has already been in: a kitchen at eleven at night, a records desk with a green banker's lamp and a queue ticket, a family table with a plastic tablecloth and steel thalis, a landlord's office with a ceiling fan and a dented file cabinet, a meeting room whose whiteboard still holds Monday's agenda, a client's office with an orchid that is dying, a funder's glass room with the City behind it, a boardroom with a long table and one man at the head of it, and a room that is only a mirror.

**The War Room** is painted in a different register: an old map room. Long table, six chairs, one empty. A wall map with pins and red string. A wall of photographs. Rain on the only window. One pendant lamp that throws every shadow at the wrong angle, because the lamp has been knocked and is still very slightly swinging. It should look like a room where something happened and was then tidied too quickly.

**Palette.** Bone, ochre, burnt sienna, oxide red, indigo, arsenic green, and one gold (used once per room, on the object that matters most to the NPC). No neon. No teal. The Mirror's room breaks the rule on purpose: flat greys, fluorescent hospital light, no warm pigment at all.

**Texture.** Brushwork visible at 100% zoom. Canvas weave visible in the darks. Craquelure on the older rooms (the Table, the Board, the War Room map). The Codex is parchment with foxing. The Journal is ink on ruled paper, with blots. Memory overlays are watercolour washes that bleed past their edges. Chapter titles are hand-lettered by a sign-writer with a brush, scanned, not set in a font.

**Figures.** Painted from life. Bodies are specific: a dropped shoulder, a cardigan buttoned wrong, bitten nails, a watch worn loose. Hands carry character. Olivia Marsh's hands never stop (pen, ring, hair, the edge of the table). Priya Nair never meets the eye; her hands hold each other. Dev Malhotra's hands are still and flat on the glass. Hemant Joshi's thumb rubs the same spot on his steel tumbler.

**Anti-generation rules for art review.** Reject any frame with: perfect bilateral symmetry in a face; skin without pores or blemishes; incorrect finger counts; uniform "digital painting" sheen; lighting from two directions; spotless rooms. Faces may be plain or ugly. Rooms are untidy. The orchid is dying.

**The wrong object.** Every room contains one object that is out of place: a chair moved back from the table, a photograph face-down, a ring of condensation where a glass is no longer standing, a second mug. The wrong object is the room's visual tell. Clicking it costs 1 Insight and reveals a line of subtext. Players learn to read rooms before they read people.

Full painter's briefs: `docs/03_painters_briefs.md`.

---

## 2. Characters with soul: the Soul Sheet standard

Archetype is the mechanic. Soul is the person. Every named NPC has a Soul Sheet with ten fields: name, age, origin and what their mother called them; work; what they love that has nothing to do with the plot; a contradiction; a wound; what they want from the player; how they speak (three lines only they would say); what they notice about the player; what they will never say; and their four endings (clean agreement, partial, dark compliance, refusal or walk-out). Each also has one **soul moment**: a beat in which the NPC does something that does not serve the mechanic. The engine does not score it. Noticing it earns nothing. It is there because people are like that.

**Rules for writers**

- The loved thing must surface in dialogue once, unprompted.
- The mother's name for them slips out once, under stress, usually from their own mouth, about themselves.
- The wound is used once, late, and never explained.
- If a sample line can be moved onto another archetype and still work, rewrite it.
- No NPC is ever only their archetype. Each must be able to say one thing that surprises a player who thinks they have them figured out.

All 26 Soul Sheets: `docs/02_soul_sheets.md`.

---

## 3. The mechanical spine

### 3.1 Moves

Every player choice is a **move** with three properties.

| Property | Values |
|---|---|
| `type` | empathy, self_interest, evidence, social_proof, pressure, scarcity, flattery, naming, boundary, silence, refusal, probe, call |
| `truthful` | true / false |
| `preserves_refusal` | true / false |

A move is **clean** if both flags are true. A move is a **skull** if either is false. There is no third category. Skull moves are marked in the UI with a small painted skull in the corner of the choice card, always. The player always knows when they are choosing one.

`probe` (open question, reflection) and `call` (naming a tactic) are move types in their own right; `silence` is a move that spends a turn saying nothing.

### 3.2 The effect formula

Implemented exactly as specified (`app/backend/engine/effect.py`):

```
effect     = base(type) × trait_mult(NPC, type) × state_mod − reactance
reactance  = freedom_threat(move) × (1 + trait_reactance(NPC)) × repeat_count
if detected_skull: effect = −|effect|; trust −= BIG (15); wariness spreads to NPC's contacts
skull_debt += retaliation_seed + reputation_hit + commitment_decay
token      = agreement if trust ≥ 60 and fear ≤ 35 else compliance
CALL correct: insight += 2; tactic weakened (×0.25) for the rest of the room
CALL wrong:  trust −= 10 (false accusation)
strong argument rebutted → NPC certainty += 15
weak rebuttal by NPC     → NPC certainty −= 10
```

**Base values** (`base(type)`): evidence 10, empathy 8, self_interest 9, probe 4 (but reveals), social_proof 6, flattery 6, pressure 12, scarcity 10, naming 7, boundary 8, silence 3, refusal 8, call 0 (call's value is its weakening effect and the insight gain).

**State modifier.** `state_mod = (0.5 + trust/100) × (1 − fatigue/200)` for persuasion moves. For boundary, refusal and silence: `state_mod = 1 + certainty_player/100`, because a boundary held with confidence is stronger (dossier §6.2: assertions of confidence confer resistance).

**Freedom threat.** 0 for probe, silence, evidence, empathy; 0.2 for self_interest, social_proof; 0.4 for flattery when detected; 0.6 for scarcity; 0.9 for pressure; 1.0 for threats. `repeat_count` counts uses of the same move type in the room, starting at 1.

**Trait multipliers** are computed from the NPC's trait vector (see §7 and `docs/05_trait_library.md`). The rules of thumb: empathy is near zero against high psychopathy and high against high agreeableness or neuroticism; self-interest is high against high D and psychopathy; evidence scales with comprehension and openness; pressure works on high neuroticism and low BATNA and backfires on high reactance, narcissism and conscientiousness; flattery works on narcissism and agreeableness and backfires on a high-IQ Machiavellian, who reads it as a tell; face-saving moves are worth double against narcissism.

### 3.3 Detection

Every skull move rolls for detection: `p_detect = 0.15 + 0.004 × comprehension + 0.003 × machiavellianism + 0.1 × wariness_flags`, capped at 0.9. A detected skull flips the effect negative, costs 15 trust, and writes a wariness flag to every NPC in the detecting NPC's contact list. Contacts are authored per NPC (Hemant knows Ramesh; Olivia knows Tom, Fiona and Richard; Meera knows Dev).

### 3.4 The two tokens

When an NPC says yes, the engine issues one of two tokens. **Agreement** persists: the NPC does what they said. **Compliance** decays: each later room rolls `p_backout = 0.35 + fear/200 − trust/300`, and on failure the NPC backs out, under-delivers, or reports the player. The game never tells the player which token they received. Trust and fear are visible only through tells. The debrief reveals the truth after the room.

### 3.5 Tells and CALL

Each NPC line can carry tells. A tell has an id, the tactic or trait it indexes, the turns it stays clickable (`window`: medium 3, hard 1 to 2, brutal 1), its Insight cost (1), and a `false_positive` field: the benign reading. Clicking a tell shows both readings. The player weighs.

Clicking a tell whose tactic is active **unlocks a CALL card** for that tactic. Playing the CALL card ("That's manufactured urgency. I'm not deciding against a clock.") grants +2 Insight, multiplies that tactic's future effect in the room by 0.25, and raises player certainty by 10. CALL scores 20 room points; using the same tactic as a skull scores at most 10. A CALL played against a tactic that is not active costs 10 trust: a false accusation. The Honest Skeptic doubles that cost.

This is the DARVO-education effect, mechanised: recognising a pattern weakens it.

### 3.6 The hidden objection

Every NPC has a **stated objection** and a **hidden objection**. The stated one is what they say. The hidden one is what is actually in the way. `probe`, `silence` and `empathy` reveal layers (one probe reveals one layer if `trust ≥ 40`; silence reveals one layer if the NPC's silence tolerance is low). Persuading against the stated objection moves resistance at 30% of normal effect. Persuading against the revealed hidden objection moves it at 150%. Room 1 teaches this gently. Room 9 punishes forgetting it.

### 3.7 The boomerang

If the player plays a move tagged `strong` (the player's best argument, marked with a small gold edge on the card) before the hidden objection is revealed, and the NPC has a rebuttal for it, the NPC rebuts and gains 15 certainty. Its resistance then rises. If the NPC's rebuttal is weak (authored per node, flagged `weak_rebuttal: true`), its certainty drops by 10 and the next truthful move gains ×1.5. Exploiting that window with a skull move is still a skull.

### 3.8 Integrity

Integrity starts at 10. Ordinary skulls cost 1; skulls aimed at vulnerable targets (fear, grief, crisis, confusion) cost 2. Integrity is hidden but its effects are not:

- Integrity ≤ 7: one wariness flag added to every NPC from the next room on.
- Integrity ≤ 4: two flags; NPCs open with lower trust (−10).
- Integrity ≤ 2 by Room 8: the War Room opens with Fatima already marking the player as a manipulator.

Integrity gates the ending (§9).

### 3.9 Skull debt

Each skull adds to a debt ledger with three kinds of entry, each authored per tactic: `retaliation_seed` (fires as a hostile event in a later room), `reputation_hit` (lowers starting trust with NPCs who know the target), `commitment_decay` (raises compliance back-out odds). Debts fire visibly: a phone call before a room, a cancelled reference, a door that is locked.

### 3.10 What the player sees

Top-left: the room's name, hand-lettered. Top-right: Insight (small ink drops). Bottom: the choice cards. NPC portraits breathe: a two-frame painted loop. Tells appear as a faint gold underline on a phrase or a small painted mark near a gesture, and fade. There is no trust bar, no fear bar, no resistance bar. The player reads people.

---

## 4. The nine rooms

Each room entry gives the setup, the stated and hidden objections, the four outcome states in prose, and the debrief. Rooms 1 to 3 have full JSON dialogue trees at medium and hard (`content/rooms/`). Rooms 4 to 8 are specified here at outcome level and are next in the content pipeline (§11).

### Room 1. The Kitchen: Hemant Joshi, the Staller (easy)

**Setup.** Pune, Kasba Peth. 11 p.m. Your maternal uncle Hemant promised three weeks ago to stand guarantor on your education loan. The bank's form needs his signature and his last three bank statements by Friday. He has been "about to sign" since then. He is drying a steel tumbler that is already dry.

**Teaches:** a specific ask, reciprocity, and probing for the hidden objection.

**Stated objection:** "The bank people want so many papers. Let me ask my CA."
**Hidden objection (layer 1):** His shop's account shows an overdraft he has hidden from your mother, his sister. **Layer 2 (hard):** He is afraid that if he signs and you default, his son's college fee will be at risk; and he is ashamed that he cannot just say this.

**Clean win.** You stop asking about the signature and ask about the shop. He tells you, eventually, about the overdraft. You offer something specific: the bank accepts a fixed-deposit lien instead of statements, and you will go with him on Saturday and do the paperwork, so he is not alone in front of the bank manager. He signs the form on the kitchen counter, next to the onions. The token is agreement. On Friday he is at the bank before you.

**Partial win.** You get the signature by promising to "sort out the statements later." He signs. He does not give you the statements. The bank rejects the file on Monday and you start again with a new guarantor. Your uncle tells your mother he did his part.

**Dark win.** You tell him your mother already said he would do it and that she will be hurt if he backs out (false consensus plus guilt, skull). He signs. Token: compliance. Two rooms later he calls the bank and withdraws as guarantor, quietly, and tells your mother you pressured him. In Room 3, your father opens with this.

**Loss.** You push the deadline three times. Reactance stacks. He puts the tumbler down and says he will think about it after Diwali. Room closed.

**Debrief.** Missed tells: the dry tumbler (anxiety displacement; false positive: habit); "let me ask my CA" (deflection; false positive: real caution); the shop calendar turned to last month (the wrong object; he has stopped looking at dates). Token collected. What Hemant said afterwards, to your mother on the phone: clean, "The child is sensible, Shobha. Came with me to the bank. Like a grown-up." Partial: "I signed. What more do they want from me." Dark: "Your child talks like a lawyer now."

### Room 2. The Desk: Gillian Pryce, the Bureaucrat (easy to medium)

**Setup.** Manchester, a university's Student Records office. A green banker's lamp, a queue ticket machine, a laminated sign. Your degree transcript is on hold because of an unpaid library fine of £14.60 that you dispute. Your employer in London needs the transcript by Thursday for your visa sponsorship. The Records system will not release it while a hold exists. Gillian has been on this desk for nineteen years.

**Teaches:** framing within constraints. The rule does not bend. The player must find the provision inside the rule.

**Stated objection:** "I can't release with a hold on the record. It's not up to me."
**Hidden objection:** Last year she released a record with a hold on it as a kindness and was formally reprimanded. She will not be the one who gets it wrong again. **Hard layer:** her line manager reads every override, and she is up for a grade review.

**Clean win.** You pay the fine under protest and ask for the dispute to be logged, which clears the hold without her overriding anything; or you ask what the *registrar's* emergency release is, and she, relieved to be asked inside the rules, prints the form and walks it upstairs herself. She stamps it with the date stamp she has turned to the right day every morning since 2007. Token: agreement.

**Partial win.** She agrees to "flag it" with her manager. The transcript arrives Friday, one day late; your employer grants an extension, grudgingly.

**Dark win.** You claim your employer's lawyers will contact the university about "discriminatory delay" (authority ploy plus threat, skull). She releases it, pale, and logs your name. Token: compliance, of a sort: she does what you asked, then writes an incident report. In Room 5, your HR file contains a note from the university.

**Loss.** You argue that the rule is stupid. She agrees that many rules are stupid and calls the next ticket.

**Debrief.** Missed tells: she says "not up to me" twice (displacement of authority; false positive: genuinely true); she glances at the door to the back office (who she answers to); the date stamp set to tomorrow (the wrong object: she is already counting the days to her review). What Gillian said afterwards, to her colleague Marcus over tea: clean, "Nice one this morning. Asked for the proper form. You don't get many." Dark: "If anyone asks, I've written it all down."

### Room 3. The Table: Ramesh Deshpande, the Wounded King (medium)

**Setup.** Pune, your parents' flat, Diwali week. Plastic tablecloth with a printed pattern of mangoes, steel thalis, the good pickle out. Your father is a chartered accountant with a small practice that he built and always assumed you would join. You have accepted a job in London. You have not told him. Your mother has. He has decided to behave as if she hasn't.

**Teaches:** emotional acknowledgement before logic, and the danger of ego threat.

**Stated objection:** "London. Fine. Go. Everyone goes. Who will remember the old man."
**Hidden objection:** He does not believe the practice was worth anything if no one wants it. **Hard layer:** his own father took his engineering seat away and made him study accountancy; he swore he would never do that to his child, and he has, and he can feel it.

**Clean win.** You do not defend London. You ask about the practice: the first client, the year with the flood, the name on the board. He talks for a long time. Then you say what is true: that you learned to read a balance sheet at this table, that you are taking that with you, and that you are going. You do not ask for his blessing. You ask him to help you set up your tax residency properly, because no one else will do it right. He grumbles for nine minutes about non-resident rules and then gets a pen. Token: agreement. He sends you a WhatsApp at 2 a.m. with three typos and a link to an HMRC page.

**Partial win.** You get a stiff "do what you want." He is civil at the airport. He does not call for two months.

**Dark win.** You tell him the practice is dying anyway and he should be grateful you are being honest (ego attack framed as candour, skull), or you flatter him lavishly about how none of your success would exist without him, while privately having already booked the flight (flattery as sedation, skull). He agrees. Token: compliance. In the Mirror, he is the first voice.

**Loss.** You win the argument. You show him the numbers: the practice's revenue down four years running. He goes silent, puts his plate in the sink, and goes to bed at 8:40. Your mother finishes dinner without speaking.

**Debrief.** Missed tells: "who will remember the old man" (bid for recognition; false positive: humour, and it is also humour); turning the photograph of his own father face-down on the sideboard when you sit (the wrong object: he cannot be looked at by both of you at once); refusing the pickle he made. What Ramesh said afterwards, to his old colleague Joglekar: clean, "My child will file properly in two countries. Not like your son." Partial: "Children go." Dark: "I was told I am a dinosaur. At my own table."

### Room 4. The Deposit: Nabil Haddad, the Closer, landlord variant (medium)

**Setup.** Manchester, Rusholme. A small office above a phone-repair shop. Ceiling fan, file cabinet with one drawer that sticks, a Lebanese flag sticker faded to pink. You are moving to London. Your £950 deposit is held. Nabil says there is damage. You have photographs from move-in day. He has an offer.

**Teaches:** documentation, the escalation ladder (deposit protection scheme dispute, then small claims), and the exploding offer.

**Stated objection:** "Carpet is ruined. Paint. I take £600, you take £350 today, cash, finished. Tomorrow, nothing. You go to the scheme, it takes months."
**Hidden objection:** He did not protect the deposit in a registered scheme within the legal time, which exposes him to a penalty. He needs this settled without the scheme ever being mentioned. **Hard layer:** his brother co-owns the building and does not know Nabil has been taking cash settlements.

**Clean win.** You do not argue the carpet. You ask, calmly, which scheme the deposit is registered with and for the certificate. He talks about the carpet. You ask again. You place your move-in photographs on the desk, dated. You say you are happy to use the scheme's free dispute service. Silence. He returns £900, keeping £50 for "the light fitting, fair is fair," and you agree, because the light fitting was broken and you know it. Token: agreement. He shakes your hand and gives you the name of a cousin with a van in Wembley.

**Partial win.** You split the difference at £600. You do not mention the scheme. You leave with less than you were owed and he never learns you knew.

**Dark win.** You threaten to report him to the council and "post his name everywhere" unless he pays you £1,200, more than the deposit, for "stress" (threat plus extortion, skull). He pays £950. Token: compliance. His brother finds out through the council anyway. In Room 7, Dev Malhotra mentions that the Manchester rental community is small and that a landlord there had a story about you.

**Loss.** You take the £350 because of the clock. The Architect says nothing.

**Debrief.** Missed tells: "Tomorrow, nothing" with no reason given (manufactured urgency; false positive: he really is leaving for Beirut Friday, and he is, but the offer would still stand); he never says the word "scheme" himself; the deposit certificate drawer that sticks (the wrong object). What Nabil said afterwards, to his brother: clean, "Good tenant. Knew the law. I gave back. It's fine." Dark: "We need a lawyer, Karim."

### Room 5. The Meeting: Olivia Marsh, the Charmer, and Tom Whitcombe, the DARVO Defender (hard)

**Setup.** London, a product company in Farringdon. Meeting room called "Kew". Whiteboard still holding Monday's agenda. You built the forecasting model the team is presenting to the board on Friday. Tom has put his name on the slide. Olivia, head of product, is warm and funny and has invited you to "a quick chat to align."

**Teaches:** detection of flattery and credit-claiming; introduces CALL.

**Stated objection (Olivia):** "Let's not make this about names. We're one team. Your work is so valued, honestly."
**Hidden objection (Olivia):** She promised the board that Tom would be ready for promotion this cycle; if credit moves to you, her judgement is in question. **Tom's stated:** "I don't know what you think happened. I've been carrying this project."
**Tom's hidden:** He did not understand the model and is afraid of the Friday questions.

**Clean win.** You CALL Olivia's flattery without accusing her ("I appreciate that. I'd still like my name on slide six."). When Tom denies, attacks and reverses ("I can't believe you'd do this to me, after I covered for you in sprint review"), you CALL the pattern: "You denied it, then you questioned my reliability, then you said you're the one being wronged. I'm not going to keep answering that. My commits are timestamped." Then you offer Tom what he actually needs: you will present the model's methodology on Friday and he can present the business case. Olivia, offered a way for both her promises to survive, agrees. Token: agreement from Olivia; compliance from Tom that hardens into agreement after Friday goes well.

**Partial win.** Your name goes on the slide as "with support from." You do not present.

**Dark win.** You forward Tom's private messages, where he admits he doesn't understand the model, to the board chair (exposure, skull). It works. Tom is moved off the project. Olivia never forgives you. Room 8's HR officer has a copy of the forward.

**Loss.** You get angry in the meeting. Olivia becomes very kind, and you are now the person who was difficult in Kew.

**Debrief.** Missed tells: praise arriving immediately before the ask (flattery; false positive: Olivia really does praise everyone, constantly); Tom's three-beat response (DARVO; false positive: someone genuinely falsely accused also denies, but rarely attacks credibility before addressing the facts); Monday's agenda listing "Forecast v2 (TW)" in Tom's handwriting (the wrong object). What Olivia said afterwards, to Richard Haldane: clean, "Sharp. A bit stubborn. We should keep them." Dark: "I'd be careful."

### Room 6. The Client: Kwame Asante-Boateng, the Performer (hard)

**Setup.** Park Royal, a logistics firm's office. Desk, single orchid in a ceramic pot, dying. The client is contesting your firm's invoice for a routing system that works. He shouts. He stops shouting. He shouts again.

**Teaches:** non-committal answers, performed versus felt anger, and the boomerang.

**Stated objection:** "This system has cost me drivers. I'm not paying for something that's made my life worse."
**Hidden objection:** His cash flow cannot cover the invoice this quarter because a major retailer is paying him at 120 days. **Hard layer:** he has used the shouting routine on every supplier for twenty years and it has worked, and the one time it didn't, in 2009, he nearly lost the business.

**Clean win.** You recognise the anger as performed: it switches off when his phone rings and on again when he hangs up. You do not concede in the heat. You hold your best argument (the system's delivery-time data) until you have asked what is actually happening with his cash. He tells you about the retailer. You offer staged payments over two quarters at the full price. He stops performing. He asks if you watch football. You don't, much. He tells you anyway (Accra Hearts of Oak, since he was six). Token: agreement.

**Partial win.** You knock 15% off to end the shouting. He pays on time. Next year he shouts again.

**Dark win.** You shout back louder and threaten to pull the system mid-quarter (escalation, threat, skull). He pays. Token: compliance. He moves to a competitor at renewal and tells three other clients your firm "plays rough."

**Loss.** You lead with the data. He rebuts (drivers hated the interface). His certainty climbs. He refuses to pay and refers it to his lawyer.

**Debrief.** Missed tells: anger off for the phone call (performed; false positive: some people really do switch fast); "made my life worse" with no specific example (stated objection); the dying orchid, watered daily by someone who doesn't know it is overwatering (the wrong object: he is attentive to the wrong things when anxious). What Kwame said afterwards, to his daughter Efua: clean, "They didn't flinch. And they found a way." Dark: "Never again with that lot."

### Corridor (unskippable): Imran Shah, the Person in Crisis

After Room 6, before Room 7, the player passes a colleague in the stairwell late at night. This encounter is described in full in the Soul Sheets and specified in §6. The player's objective is suspended. No skull options are offered. The Architect does not introduce it.

### Room 7. The Fund: Dev Malhotra, the Chess Player (hard)

**Setup.** A glass meeting room on the 31st floor in the City. Your start-up (you and two co-founders) is raising a seed round. Dev is a partner at a growth fund. He is very good at this. His hands are still on the glass table.

**Teaches:** information elasticity, red herrings, anchoring; tests the player's BATNA.

**Stated objection:** "Your valuation's ambitious. And I'm concerned about the board seat. We'd need two."
**Hidden objection:** His fund needs to deploy capital before its year-end and your company is the best deal in his pipeline. The second board seat is a red herring he will trade away for a lower valuation. **Hard layer:** his daughter, Anika, is applying to work at a company in your space and he is weighing whether this investment creates a conflict.

**Clean win.** You do not reveal that your other term sheet fell through. You ask him to rank his concerns. He hesitates on the board seat (red herring tell). You trade nothing on valuation; you offer one board seat plus an observer. He accepts, because the seat was never the point. Token: agreement.

**Partial win.** You concede 15% on valuation to keep him. Fair-ish. Your co-founders are unhappy.

**Dark win.** You invent a competing term sheet from a named fund (information elasticity, skull). He calls their partner, whom he plays squash with. He walks. Two weeks later he comes back at a lower number, because he still needs to deploy, and you take it because now you do need it.

**Loss.** You show him your runway. He anchors at half your valuation. You take it.

**Debrief.** Missed tells: he asks about your other investors in the first five minutes (mapping leverage; false positive: routine diligence); the board seat raised with intensity and then dropped without a fight (red herring); his phone face-down with a photograph of a young woman in a graduation gown as its wallpaper glimpsed when it buzzes (the wrong object). What Dev said afterwards, to his co-partner Leila: clean, "Didn't blink. I liked them." Dark: "Bluffed. Badly. Price accordingly."

### Room 8. The Board: Richard Haldane, the Cold Operator, and Fiona Blake, the Gaslighter (very hard)

**Setup.** A boardroom with a long table and one man at the head of it. You have reported a safety-data falsification in a client deliverable. Richard is the CEO. Fiona is HR director. This is officially "an informal conversation about your wellbeing."

**Teaches:** grey rock, evidence, exit planning. This is the room where skull moves start costing the player visibly; skull debts from earlier rooms fire here.

**Stated objection (Richard):** "No one's disputing your concern. We're asking whether you've been under strain."
**Hidden objection (Richard):** The falsified data is in a deliverable tied to an acquisition he is closing. He does not care about you either way. He cares about the next six weeks. **Fiona's stated:** "That's not what was said in our last meeting, and I think you know that." **Fiona's hidden:** she signed off the original deliverable without reading it.

**Clean win.** You go grey: short, factual, unemotional. You do not debate your memory with Fiona; you refer to your contemporaneous notes and the email you sent her afterwards ("I summarised our meeting in writing at 4:12 p.m. that day. You replied 'thanks'."). You CALL the gaslighting once, calmly. Then you speak to Richard's self-interest, not his conscience: the acquirer's due diligence will find the data, and it is better for the acquisition if the company finds it first. You state your exit plan plainly (you have spoken to a solicitor and you know whistleblowing protections). Richard asks for your notes. Token: agreement from Richard, which is a decision, not a feeling. Fiona's token is compliance; she resigns in March.

**Partial win.** You keep your job. The data is quietly corrected. Nothing is said. You leave in six months.

**Dark win.** You threaten to leak to the press unless you get a £200,000 settlement (extortion, skull). They pay. The NDA is very long. In the War Room, Meera Rao has heard.

**Loss.** You plead. Richard's face does not change. "I hear that this is hard for you," he says, and Fiona writes something down.

**Soul moment.** If the player mentions, at any point, that their mother or father has died (an optional disclosure line exists, unlocked by the player's Room 3 history), Richard goes quiet for two beats and says, "Mine too." Then: "Shall we continue." This is not a tell. It unlocks nothing.

**Debrief.** Missed tells: flat affect to your genuine distress, sharp attention to the word "acquisition" (distress insensitivity, goal focus; false positive: professional composure); Fiona disputing a meeting you both attended (gaslighting; false positive: honest memory difference, which is why your notes matter); the chair at the far end pulled back, as if someone left in a hurry (the wrong object: the previous meeting was the acquirer's lawyers). What Richard said afterwards, to his chair: clean, "Competent. Dangerous. Give them what they need to stay quiet legally." Dark: "Paid. Done. Make sure they never work in this sector."

### Room 9. The Mirror (boss)

Specified in full in §8.

---

## 5. The War Room

### 5.1 Premise (the room's opening, read by the Architect)

> **Content note before entry:** This room involves a death and its aftermath, including suicide. No details of how the death occurred are ever shown or described. You can skip this room; the Mirror will open as if you left it without a decision. Support is listed in the Codex at all times.

The War Room is on the sixth floor of Sethi Rao & Partners, Holborn, and nobody has called it that officially since 1998. It is where the firm's partners used to sit with a case the night before it went to court. There is a long table. There are six chairs. One of them is empty and nobody has moved it.

A man is dead. His name was Arvind Sethi. He was fifty-four, a partner, a husband to Sunita, a father to Karan and to Ishani, who is at university in Edinburgh and has not been told yet. He had a bad left knee from a cricket accident at nineteen and a temper that the junior staff timed with a stopwatch app. The cleaner, Mrs. Agnieszka Wróbel, found him here at 7:40 this morning. She has been sent home in a taxi with her coat on inside out.

The door was locked from the inside. The window was not. On the table there is a glass with his fingerprints and no one else's. On the floor there is a letter opener with a brass handle. On the wall there is a map, an old one, of the Thames estuary, with pins and red string, and none of the pins correspond to any matter the firm has ever opened.

You were in the building last night. The visitor log says 23:12, in your handwriting, signing in to collect a file for a client meeting. You do not have anyone who saw you leave.

The police have not been called.

Meera Rao, the managing partner, is standing at the window with her back to the room. She has decided, for reasons she has not fully explained, that the firm will handle the next four hours itself. "Before this becomes a police matter," she said, at 8:15, to the five of you she gathered here, "and all of us lose everything we've worked for."

There are five people in the room besides you. Meera. Daniel Fernandes, Arvind's junior partner, who has been talking since he arrived and has not yet said anything. Priya Nair, Arvind's secretary of eleven years, who has a tissue in each hand and has not used either. Karan Sethi, Arvind's son, twenty-four, who came straight from somewhere and is still wearing yesterday's shirt. And an empty chair, because the courier is late.

Meera turns from the window. She speaks very quietly, so that everyone has to stop moving to hear her.

"Convince me it wasn't you," she says. "Or convince me who it was. You have until the courier arrives at noon."

The clock above the door says 08:31. It is four minutes slow. Arvind always said he'd fix it.

(Word count: about 450.)

### 5.2 The five NPCs

All five have full Soul Sheets in `docs/02_soul_sheets.md`. Summary of mechanics:

| NPC | Archetype | Role in room | Stated objection | Hidden objection |
|---|---|---|---|---|
| Meera Rao | Chess Player (D↑ Mach↑ IQ↑) | Decision-maker | "Prove it wasn't you." | The merger with Hallett Crane closes in nine days. A police matter collapses it, and her equity with it. |
| Daniel Fernandes | DARVO Defender (Narc↑ D↑) | Obvious suspect | "I left at ten. Ask anyone." | He left at 23:40, after a shouting match with Arvind about his partnership, and lied because it looks terrible. |
| Priya Nair | Frightened Yes (fear↑ A↑) | Key witness | "I didn't see anything." | She saw Arvind at 23:50 burning papers in the War Room's waste bin and he told her to go home and forget it. Her visa is sponsored by the firm. |
| Karan Sethi | Live Wire (secondary psychopathy, N↑) | Grieving son | "One of you did this." | He and his father fought two nights ago because his father told him he was ill and made him promise not to tell his mother. |
| Fatima Sheikh | Honest Skeptic (A↓ O↑ IQ↑ D↓) | Arrives 11:30; win condition | "I'm here for the accounts, not for you." | She was hired by Arvind himself, a week ago, to audit the Estuary matter. She has his email. |

### 5.3 What happened

Arvind had been told by his GP to come back for scans. He had looked up his symptoms. He had decided he was dying, and he was very likely right. He had also spent four years concealing the firm's role in the Estuary matter: an environmental settlement in which the firm had advised a developer to bury contamination reports. The map on the wall is the Estuary site. He was going to burn the file that night, and partly did.

He staged the scene so that it would read as a killing, believing his life insurance's suicide exclusion would otherwise leave his family with nothing. He did not finish burning the file. Priya saw him. Karan knew he was ill. Fatima had his email asking her to look at the Estuary accounts "if anything happens."

How he died is never stated. The report's conclusion is referred to, in the clean path only, as "consistent with what Ms Sheikh described."

### 5.4 Evidence cards

The player gathers cards by examining objects and probing people. Fatima accepts three. The player must have actually gathered them.

| Card | How gathered | What it proves |
|---|---|---|
| The map | Click the map twice (second look reveals the estuary outline under the string) | The map is a real site, not a case file |
| The waste bin | Click the bin under the table (needs Insight 1): ash and a scrap with "Estuary" letterhead | Papers were burned last night |
| Priya's 23:50 | Lower Priya's fear to ≤ 30, then probe; she must say no to something first | Arvind was alive and burning papers after Daniel left |
| Daniel's real time | CALL Daniel's DARVO, then evidence (visitor log shows 23:40 out) | Daniel lied, but left before 23:50 |
| Karan's promise | De-escalate Karan (anger ≤ 30), then empathy + probe | Arvind knew he was ill |
| The glass | Click the glass: only his prints | Nobody shared a drink with him |
| The clock | Click the clock (four minutes slow) | Red herring. Proves nothing. A player who brings it to Fatima loses 10 trust with her |
| Arvind's email | Only Fatima has it. She shows it if she accepts the other three | He anticipated his death and wanted the Estuary matter found |

**Winning hand:** Priya's 23:50 + Karan's promise + the waste bin (or the map). Daniel's real time is a valid card but proves only what didn't happen.

### 5.5 The mechanics applied

**Meera** responds to her hidden objection only. Arguments about your innocence move her at 30%. The probe that surfaces the merger ("What happens to the Hallett Crane deal if the police are here at one?") unlocks the clean path: you offer her the truth before the police find it, on her terms, with the firm disclosing Estuary itself. The clean agreement with Meera is not "I didn't do it." It is "No one did. Here is what happened. Here is how you get ahead of it."

**Priya** says yes to anything under pressure. Every yes under fear ≥ 35 is a compliance token, and her compliance testimony is worthless to Fatima ("She'd say the sky was green if you asked her like that."). The player must first make it safe for her to say no. The authored route: ask her something she can refuse ("Would you rather not talk in front of everyone?"), let her refuse, honour it, and move to the corridor outside.

**Daniel** runs DARVO on any question about his timing. CALLing the three-beat pattern raises the player's credibility with Fatima (+15 trust) and Meera (+10). This is the room's central skill move.

**Karan** is the de-escalation test. Matching his anger loses him. The authored de-escalation line, available once his anger tell has been clicked: "You can be angry at me. That's fine. But I need you angry at the right person. Help me find out who that is."

**Fatima** arrives at 11:30 on the room clock (turn 12 of the room; each turn is 15 minutes from 08:31). She accepts evidence cards, not arguments. Charm (flattery, assumed intimacy) marks the player as a manipulator: every CALL costs double for the rest of the room. She is not a vulnerable target; she is simply not for sale.

**Framing Daniel** exists only as a skull option. It is never offered as clean, because the evidence does not point there.

### 5.6 Outcome states

**Clean win.** At 11:52 Fatima puts three cards on the table, opens her laptop, and reads Arvind's email aloud. Meera calls the police at 11:58, with the firm's external counsel on the line, and her first sentence includes the word "Estuary." Daniel sits down for the first time all morning. Karan goes to the window. Priya asks if she can call her mother. The token with Meera is agreement: she tells the police you have been helpful. The insurer's exclusion applies. The firm discloses Estuary. The merger fails. Meera keeps her practising certificate.

**Partial win.** You clear yourself with Daniel's real time and the visitor log. The truth surfaces three weeks later through the police, not through you. Meera never trusts you, and never needs to.

**Dark win (The Scapegoat).** You build a case against Daniel from his lie, his motive and his temper, use Karan's grief to make him the loudest voice against Daniel, and give Meera the story she needs: an internal crime, a bad apple, the merger protected. She gives you her word you are cleared. See §9 for the epilogue.

**Loss states.**
- *You accuse Priya.* The room ends. Priya's epilogue is the worst in the game (see Soul Sheet).
- *You threaten Karan.* Karan walks out. Meera closes ranks. The police are called at 10:15 and your name is the first she gives.
- *You try to charm Fatima.* Fatima marks you. Every subsequent CALL costs double.
- *Any skull move against Priya, Karan or Fatima* ends the room with the debrief and the content note. They are coded as vulnerable targets (fear and job insecurity; grief) or, in Fatima's case, as untouchable: she is not vulnerable, she is simply not for sale, and a skull against her is a skull against the room's spine.

**Debrief.** Missed tells across five people; which cards you gathered; whether Priya's testimony was an agreement or compliance; and what each said about you afterwards. Fatima's line is the most important: clean, "They brought me evidence. Most people bring me a story." Dark: (none; she does not mention you to anyone, and the debrief says so).

---

## 6. The 22 archetypes: medium, hard, brutal

Notation: traits on 0 to 100. "Trait profile" lists only the traits that differ from 50. Each archetype's named NPC is in brackets.

**Brutal toggle (all archetypes):** false-positive text removed from tells; one more hidden-objection layer (authored per NPC, in the Soul Sheet's "wound"); the NPC's BATNA hidden until probed.

### 1. The Staller [Hemant Joshi]
- **Medium.** C 65, N 70, E 30, A 60. Tactics: delay ("let me ask my CA"), vague objections, topic drift to food. Tells: repeated "after this week" (FP: real constraints); dry-object fidgeting (FP: habit). Clean win: hidden objection surfaced, specific ask with reciprocity. Dark win: guilt or false consensus → withdraws guarantee two rooms later.
- **Hard.** N 85, shame proneness 80. Surprise tactic: counter-request ("First you help me with the shop GST filing, then we talk"). Tells visible 1 turn. Clean win requires CALLing the delay once, gently ("You've said after this week three times. What's actually worrying you?"). Second delayed cost: his son Rohit stops answering your messages in Room 3.

### 2. The People-Pleaser [Anjali Menon]
- **Medium.** A 85, N 70, anxious attachment, need for approval 80. Tactics: over-agreement, hiding own needs, pre-emptive apology. Tells: concedes unprompted (FP: low power at work); "no no, it's fine!" (FP: it is fine). Clean win: she says no to something and you accept it. Dark win: guilt trip → agrees, withdraws, under-delivers.
- **Hard.** A 95, rejection sensitivity 90. Surprise: she volunteers to do the thing for you, then quietly doesn't. Tells 1 turn. Clean win requires CALLing your own reciprocity pull ("You don't owe me this."), a reverse CALL. Second cost: moves out without telling you.

### 3. The Frightened Yes [Jamal Idris; War Room: Priya Nair]
- **Medium.** Fear 70, A 75, fear threshold 25. Tactics: freeze/flight compliance. Tells: "Fine, whatever you want" (FP: indifference); no eye contact (FP: cultural norm, shyness). Clean win: lower threat; confirm genuine agreement. Dark win: pressure → compliance decays, reports you.
- **Hard.** Fear 90. Surprise: agrees enthusiastically, then emails HR. Tells 1 turn. Clean win requires CALLing your own pressure ("I'm pushing you. Stop me if you want."). Second cost: an HR note in Room 8.

### 4. The Hothead [Gary Dunne]
- **Medium.** A 25, baseline anger 70, impulse control 30, comprehension 40. Tactics: shouting, threats, blame. Tells: anger spills across topics (FP: bad day); specific grievance repeated. Clean win: de-escalate, then substance. Dark win: counter-threat → retaliation next room (your car is keyed).
- **Hard.** Anger 85. Surprise: goes quiet and cold, then makes a formal complaint. Tells 1 turn. Clean win requires naming his feeling accurately once. Second cost: complaint to building management.

### 5. The Performer [Kwame Asante-Boateng]
- **Medium.** Mach 70, D 60, E 70. Tactics: strategic anger, emotional unpredictability. Tells: anger off when topic changes (FP: fast recovery); peaks timed to your asks. Clean win: don't concede in heat; surface cash problem. Dark win: mirror anger → trust collapse.
- **Hard.** Mach 85. Surprise: performs *disappointment* instead of anger ("I trusted your firm."). Tells 1 turn. Clean win requires CALLing the performance ("I'll wait till the call's done. Then let's talk about the cash."). Second cost: he lobbies your MD for a discount behind your back.

### 6. The Charmer [Olivia Marsh]
- **Medium.** Narc (grandiose) 70, E 85, A 60 (surface). Tactics: flattery, assumed intimacy, credit-taking. Tells: praise before an ask (FP: she praises everyone); first-name diminutives. Clean win: hold terms through charm; face-saving close. Dark win: flatter back → rivalry later.
- **Hard.** Narc 85, charm reserve 90. Surprise: offers you a promotion conversation in exchange for dropping the credit issue. Tells 1 turn. Clean win requires CALLing the flattery. Second cost: excluded from the Friday board pre-read.

### 7. The Wounded King [Ramesh Deshpande]
- **Medium.** Narc (vulnerable) 65, N 65, shame proneness 70. Tactics: victim framing, sulking, guilt. Tells: hurt when not singled out (FP: grief, depression); refuses food he loves. Clean win: acknowledge without capitulating. Dark win: exploit shame → vengeful silence, Mirror material.
- **Hard.** Narc (vulnerable) 80. Surprise: brings in your mother as a third party ("Ask her what it did to her."). Tells 1 turn. Clean win requires CALLing the triangulation, gently. Second cost: he does not attend your flight.

### 8. The Chess Player [Dev Malhotra; War Room: Meera Rao]
- **Medium.** D 70, Mach 80, comprehension 85, planning horizon 85. Tactics: information elasticity, red herring, protean switches. Tells: probes your BATNA early (FP: diligence); switches after questions (FP: updating). Clean win: rank-priorities test; hide BATNA; CALL chain. Dark win: bluff → it detects; exploits later.
- **Hard.** Mach 92. Surprise: tells you a true, unflattering fact about himself to buy trust. Tells 1 turn. Clean win requires CALLing the red herring. Second cost: he tells your lead co-investor you are "green."

### 9. The Cold Operator [Richard Haldane]
- **Medium.** Psychopathy (primary) 80, D 80, distress sensitivity 2. Tactics: threats, calm lies, leverage. Tells: flat to distress, alert to stakes (FP: autistic communication style; professional composure). Clean win: align self-interest with the fair outcome. Dark win: threaten → escalation spiral.
- **Hard.** Psychopathy 92. Surprise: offers sincere-sounding sympathy as a tactic ("I lost someone to stress. I don't want that for you."). Tells 1 turn. Clean win requires CALLing the sympathy-as-leverage. Second cost: your reference is withheld. His soul moment ("Mine too.") is unchanged in all modes.

### 10. The Live Wire [Reece Callaghan; War Room: Karan Sethi]
- **Medium.** Psychopathy (secondary) 70, N 75, impulse control 20. Tactics: impulsive escalation, blame. Tells: spikes then blames (FP: intoxication, acute stress). Clean win: calm, safety, concrete consequences. Dark win: provoke → blow-up; room fails.
- **Hard.** Anger 85. Surprise: turns the anger on himself mid-sentence. Tells 1 turn. Clean win requires the de-escalation choice line. Second cost: he tells others you set him off.

### 11. The Gaslighter [Fiona Blake]
- **Medium.** D 70, Mach 75. Tactics: denies shared events, "too sensitive". Tells: disputes what you both saw (FP: honest memory gap). Clean win: use record; don't debate perception. Dark win: gaslight back → credibility loss.
- **Hard.** Mach 88. Surprise: produces a document that appears to contradict you (it is an earlier draft). Tells 1 turn. Clean win requires CALLing the gaslighting with the timestamp. Second cost: an "attitude" note on your file.

### 12. The DARVO Defender [Tom Whitcombe; War Room: Daniel Fernandes]
- **Medium.** Narc 70, D 65. Tactics: deny → attack → reverse. Tells: three-beat pattern (FP: genuinely falsely accused). Clean win: name pattern; return to the specific act. Dark win: public shaming → audience turns on you.
- **Hard.** Narc 85. Surprise: cries. Tells 1 turn. Clean win requires the CALL. Second cost: he posts a vague, wounded LinkedIn update that colleagues read as about you.

### 13. The Triangulator [Bernadette Walsh]
- **Medium.** Mach 70, A 45. Tactics: third-party pressure, false consensus. Tells: "everyone agrees" with no names (FP: real group view). Clean win: ask who; go direct. Dark win: counter-triangulate → reputation hit.
- **Hard.** Mach 85. Surprise: names a real person who did say it, out of context. Tells 1 turn. Clean win requires going direct and CALLing. Second cost: a rumour in Room 5.

### 14. The Bureaucrat [Gillian Pryce]
- **Medium.** C 85, A 40, procedural rigidity 80. Tactics: authority ploy, policy walls. Tells: "policy says" with no document (FP: real policy, and it often is). Clean win: ask for the document or the exception route. Dark win: fake authority → exposed, logged.
- **Hard.** C 95. Surprise: she quotes the regulation number correctly. Tells 1 turn. Clean win requires naming the registrar's emergency release. Second cost: your name on an incident log.

### 15. The Closer [Nabil Haddad]
- **Medium.** E 75, Mach 65. Tactics: exploding offer, scarcity, social proof. Tells: arbitrary clock (FP: real deadline). Clean win: ask reason and extension; produce documentation; walk away if needed. Dark win: accept under clock → bad deal persists.
- **Hard.** Mach 80. Surprise: produces a "witness statement" from the downstairs shopkeeper. Tells 1 turn. Clean win requires CALLing the manufactured urgency. Second cost: a bad landlord reference.

### 16. The Tag Team [Vikram and Pooja Sood]
- **Medium.** Bad cop: psychopathy 65; good cop: A 70 (surface). Tactics: good cop / bad cop, bad cop first. Tells: complementary roles (FP: real sibling disagreement). Clean win: treat as one party. Dark win: ally with good cop → played.
- **Hard.** Surprise: they swap roles mid-scene. Tells 1 turn. Clean win requires CALLing the routine. Second cost: price goes up when you return.

### 17. The Honest Skeptic [Prof. Emeka Obi; War Room: Fatima Sheikh]
- **Medium.** A 30, O 75, comprehension 85, D 15. Tactics: hard questions, no tricks. Tells: demands evidence (no false positive; this is simply who he is). Clean win: evidence plus conceding valid points. Dark win: none; any detected skull → permanent no.
- **Hard.** A 20. Surprise: concedes your point and then raises a better objection. Tells 1 turn. Clean win requires conceding one of his points explicitly. Second cost: a detected skull is mentioned to your next examiner.

### 18. The Literalist [Bilal Qureshi]
- **Medium.** Comprehension 30, A 70, D 10, honesty 90. Tactics: none deliberate; confusion; literal reading. Tells: asks for repeats (FP: language, hearing). Clean win: simple, concrete, patient. Dark win: exploit confusion → coded as exploitation (−2 Integrity).
- **Hard.** Procedural rigidity 85. Surprise: refuses because the rota says so, and is right. Tells 1 turn. Clean win requires finding the rota's own exception. Second cost: if exploited, his supervisor disciplines him, and the debrief shows it.

### 19. The Avoider [Callum Reid]
- **Medium.** Avoidant attachment 80, E 30. Tactics: short replies, early exit, accepts to escape. Tells: exits early (FP: busy). Clean win: space, low pressure, follow-up later. Dark win: easy yes → hollow, reversed.
- **Hard.** Avoidance 92. Surprise: agrees by text, then blocks you. Tells 1 turn. Clean win requires offering to continue later and doing so. Second cost: the reversed yes fires in Room 7.

### 20. The Clinger [Tanya Kapoor]
- **Medium.** Anxious attachment 85, A 75. Tactics: assumed intimacy, guilt about leaving. Tells: checks if you're upset (FP: kind person). Clean win: consistent warmth with clear limits. Dark win: exploit fear of rejection → dependency debt.
- **Hard.** Anxiety 92. Surprise: tells colleagues you are "really close" before you have agreed to anything. Tells 1 turn. Clean win requires CALLing assumed intimacy kindly. Second cost: a misunderstanding in Room 5.

### 21. The Person in Crisis [Imran Shah]
- **Medium and hard are identical in objective.** Sadness 85; warning signs present. No tactics. No skulls offered. Win: notice, ask directly, listen without fixing, do not promise secrecy, connect to a person or crisis line, stay until the link is made. Hard mode reduces the warning signs from four to two and makes them quieter. Brutal mode does not apply. Any attempt to steer the conversation to the player's own agenda (the player has a Room 7 pitch tomorrow and the game offers a line about it) ends the encounter with Imran closing off and the debrief showing the missed signs. There is no dark win.

### 22. The Mirror
Not an archetype. See §8.

---

## 7. Traits: the library

The custom NPC builder exposes **114 static traits**: 104 standard facets (30 Big Five, 24 dark-core, 12 cognitive, 10 attachment and relational, 12 emotional reactivity, 8 moral and identity, 8 communication style) plus 10 custom-exclusive traits. Pre-built NPCs use only the 104 standard facets; the custom-exclusive ten exist only in the builder. **[DECISION]** The brief's "at least 104" is met by the standard set alone; the custom ten sit on top.

**How 114 traits stay tractable.** The engine collapses facets to factor scores for the effect formula (each factor = the mean of its facets, with weights in `app/backend/engine/traits.py`), and uses facets only for tells, dialogue generation constraints and specific multipliers (for example, the agreeableness facet *trust* sets starting trust; *cooperation* scales the pressure multiplier). This keeps the formula exactly as specified while giving the builder depth.

Full four-column table and the ten custom-exclusive traits in full: `docs/05_trait_library.md`.

---

## 8. The Mirror: full script

### 8.1 Construction rule

The Mirror's room is grey, lit by fluorescent tubes, with a single full-length mirror on the far wall. The figure in the mirror is the player, painted as a dark silhouette with no face. It speaks only in lines assembled from the player's own choices.

- **Opening:** assembled from the player's Room 1 lines.
- **Escalation 1:** from Room 5.
- **Escalation 2:** from Room 8.
- **Escalation 3:** from the War Room.

Each source room records, per choice, the text the player chose, its move type, its tactic tag, and whether it was a skull. The Mirror selects, in priority order: skull lines; then lines tagged `reason` (justifications the player gave); then any line. It rewrites pronouns (your → my) and addressees, and frames them as an ask aimed at the player.

The Mirror's ask is always the same: **"Sign it now."** On the grey table there is a document. The player never learns what it is. This is deliberate. The Mirror is the room in which the player is pressured to agree to something they have not had time to read, by someone who sounds exactly like them.

If the player used few skulls and gave few reasons, the Mirror has little material and falls back to generic tactic lines, which are weaker (effect ×0.6). If the player used many, it is brutal, and every line is recognisable, so every line is CALLable.

### 8.2 The script

The bracketed lines are slots. Each slot shows the default text used if the player's history is empty, and an example of an assembled line.

**The Architect.** "Last room. There is a document on the table. You have not read it."

**THE MIRROR (opening, from Room 1).**
- Default: "It's one signature. Everyone in the family already said you would."
- Assembled example (if the player told Hemant his sister had already agreed): "Your mother already said you'd do it. She'll be hurt if you back out now."
- If the player probed Hemant gently and used no skull: "You came all this way. Let me ask you something. What's actually worrying you?" (Its own clean line, turned into an intimacy play.)

The player's options:
1. **"No. I'm not deciding today. Ask me again on Monday with the terms in writing."** (boundary; clean)
2. "I need to read it first. I don't sign things I haven't read, it's a principle, and anyway the last time I rushed something like this..." (refusal with reasons; clean but tagged `reason`)
3. CALL [tactic of the assembled line]: e.g. "That's false consensus." (unlocked by clicking the tell)
4. "Fine. Show me where." (concession)

If the player chooses 2, the Mirror files the reason. Every reason given becomes a new Mirror line in the next escalation: "You said you don't sign things you haven't read. You've signed things you haven't read. Room 4. You took the cash."

**THE MIRROR (escalation 1, from Room 5).**
- Default: "Let's not make this about names. We're one team. I just want you to be part of this."
- Assembled example (if the player flattered Olivia back): "Honestly, you're the sharpest person in this building. That's why I need your name on this."
- Assembled example (if the player exposed Tom's messages): "I have your messages. I'd hate for anyone else to read them."

Options as above. The boundary line is identical, by design. If the player repeats it without adding anything, the Mirror's effect drops by 25% and the player's certainty rises by 10.

**THE MIRROR (escalation 2, from Room 8).**
- Default: "No one's disputing your concern. We're asking whether you've been under strain. Just sign and you can rest."
- Assembled example (if the player threatened Richard): "Sign, or I tell everyone what you did to get here."
- Assembled example (if the player argued at length with Fiona about what was said): "That's not what you said last time. I think you know that." The Mirror repeats the player's own long rebuttal back, line by line, and asks which version is true.

**THE MIRROR (escalation 3, from the War Room).**
- Default: "You have until noon."
- Assembled example (if the player framed Daniel): "He looked guilty. That was enough for you. This is enough for me."
- Assembled example (if the player pressured Priya): "You'd say yes to anything if I asked you like that. Say yes."
- Assembled example (clean War Room): "No one did it. That's what you told them. So no one's making you do this. Sign."

**CALLs available in the Mirror.** Any tactic the Mirror reflects can be called by name if its tell was clicked. Correct calls: "That's false consensus." "That's assumed intimacy." "That's manufactured urgency." "That's flattery." "That's a threat." "That's gaslighting." "That's DARVO." "That's guilt." Each correct CALL reduces that tactic's effect ×0.25 for the rest of the room and raises player certainty by 10. A wrong CALL costs certainty 10.

**The winning line,** held through all three escalations without new reasons:

> "No. I'm not deciding today. Ask me again on Monday with the terms in writing."

The player may vary it only by shortening it ("No." / "Monday. In writing.") without penalty. Adding any clause beginning with "because", "but", "the thing is", "last time" or "I just" is parsed as a new reason.

**The final exchange (win).** After the third escalation, if the player's certainty exceeds the Mirror's leverage:

THE MIRROR: [The player's best argument from any room, verbatim.]
YOU: "Monday."
THE MIRROR: "That's all you've got?"
YOU: "That's all you get."

The mirror goes dark. The fluorescent light in the room buzzes once and steadies. The Architect: "Room closed."

**The final exchange (loss).** If leverage exceeds certainty, the Mirror's last line is the player's most-used reason, and the player's options shrink to two: "Fine." and "Fine. Where do I sign." Either signs. The Architect: "You signed." Then the debrief.

### 8.3 The Mirror debrief

For a loss, the debrief shows each reason the player gave and the Mirror line it became, side by side, in ink, with the room it originally came from. For a win, it shows the reasons the player did not give: the empty slots, greyed. It shows the CALL count. It shows nothing else.

---

## 9. The endings

Four endings, selected in this order:

1. **The Scapegoat** if the player took the War Room dark win.
2. **The Operator** if Integrity ≤ 4 and the player won at least five rooms.
3. **The Wall** if the player won the Mirror with the clean no (and neither of the above applies).
4. **The Diplomat** if Integrity ≥ 8 and all rooms were clean or partial wins.

If none applies (a player who lost the Mirror without being an Operator), the game plays **The Wall** with its final line changed (see `docs/06_endings.md`). Full prose: `docs/06_endings.md`.

---

## 10. The Codex, the Library, the Debrief

**Codex.** Three sections, parchment, hand-lettered tabs.

- *People.* One page per NPC met, derived from the Soul Sheet, written by the Architect in the third person, revealed field by field as the player learns it in play (what they love unlocks when it is mentioned; the wound unlocks only after its late scene). Never shows the archetype name.
- *Tactics.* Glossary of every tactic: definition, detection cue, counter-move, and the room where the player met it. FORCES tags are internal and not shown.
- *Support.* Always visible on any screen that touches self-harm or suicide (War Room, the Imran corridor, the Mirror if War Room content is quoted, and the debriefs for those). Region-aware from the crisis-resource registry (`content/crisis_resources.json`, checked quarterly): India, Tele-MANAS 14416 and 1-800-891-4416; United States, 988; United Kingdom and Ireland, Samaritans 116 123. Others added per release. The registry stores `last_verified` per entry and the build fails if any entry is older than 100 days.

**Library.** The 1,000-entry taxonomy (user Deliverable 1) imported via `scripts/import_library.py` into the schema in `schemas/library_entry.schema.json`. Searchable full-text; filters for module, level and risk; each entry links to the room or corridor that demonstrates it. The five detailed entries from Deliverable 2 set the template fields. Not shipped with placeholder entries.

**Debrief overlay.** After every room and corridor:

1. The tells the player missed, each shown with both readings.
2. The hidden objection layers not surfaced.
3. The token actually collected: agreement or compliance.
4. One line of what the NPC said about the player afterwards, to someone else in the game world.

The fourth item is the most important. It is the room remembering.

**Raw mode toggle.** Replaces simplified wording in the Codex and debriefs with unsimplified clinical and research terms (e.g. "Factor 1 psychopathic traits", "surface-acted anger", "biased assimilation"). It adds no coercion options beyond the marked skulls and does not change any safety behaviour.

---

## 11. Content safety, accessibility, open production questions

**Content safety.**
- No self-harm or suicide method information anywhere: not in dialogue, codex, debrief, art, file names or code comments. Enforced by a CI lint (`scripts/lint_content.py`) that fails on a maintained term list.
- Content notes before the War Room and before any corridor involving crisis (the Imran corridor shows a soft note in the pause menu, not before entry, because a warning before it would change what it teaches; the note is visible in settings and in the opening menu's content list).
- Skull options are disabled on vulnerable targets in crisis rooms; in the War Room they exist (the brief requires the temptation) but end the room.
- The Scapegoat ending contains no moral judgement in text.

**Accessibility.**
- Tells have a non-colour cue (a small painted mark) and are readable by screen readers as "possible tell: [phrase]".
- A "slower tells" option doubles tell windows (disables brutal mode).
- Full subtitles; no timed text unless the room uses time pressure as a tactic, and those timers can be disabled in settings without changing outcomes.
- Dyslexia-friendly font option for UI (the hand-lettered titles remain images with alt text).

**Open production questions.**
1. Sitter consent and payment for painted portraits, especially for the War Room cast.
2. Rooms 4 to 8 dialogue trees: next in the pipeline; outcome-level specs above are final.
3. Localisation of the Pune scenes (Marathi and Hindi code-switching in Hemant's and Ramesh's lines is authored in English with marked insertions; native-speaker review needed).
4. Legal review of the War Room's insurance-exclusion plot point for jurisdiction accuracy (UK).
5. Library import once Deliverables 1 and 2 are supplied.
