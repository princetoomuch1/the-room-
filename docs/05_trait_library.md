# Trait Library

**114 traits:** 104 standard facets used by pre-built and custom NPCs, plus 10 custom-exclusive traits available only in the builder. All traits are sliders, 0 to 100, default 50. "High" means ≥ 70; "low" means ≤ 30.

**How facets feed the engine.** Factor scores (A, N, E, O, C, D, mach, narc, psych, IQ, attachment) are weighted means of their facets (`app/backend/engine/traits.py`). The effect formula uses factor scores, unchanged from the dossier. Facets drive four things directly: (1) **dialogue generation constraints** (what the expression layer may and may not say); (2) **specific multipliers** on move types; (3) **tells** emitted when the facet is ≥ 70 or ≤ 30; (4) **state dynamics** (decay rates, thresholds).

Columns: **Dialogue** (what it changes in generated lines) · **Resistance** (what it changes in how moves land) · **Tell** (observable cue; false positive in brackets) · **Exploit / accommodate** (skull use marked ☠; clean accommodation unmarked).

---

## A. Big Five facets (30)

### Neuroticism

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 1 | Anxiety | Hedges, "what if", worst cases | Pressure and scarcity ×1.4; early exit | Asks the same question twice [real stakes] | ☠ Add a clock. Accommodate: remove time pressure, say what happens next |
| 2 | Anger (N facet) | Short fuse lines, sarcasm | Reactance ×1.3 | Snaps at small things [bad day] | ☠ Provoke into a mistake. Accommodate: lower pace, name the grievance |
| 3 | Depression | Flat affect, "what's the point" | Low effect from self-interest; empathy ×1.2 | Little future tense [tiredness] | Never exploit. Accommodate: patience; check wellbeing; may route to crisis rules if paired with warning signs |
| 4 | Self-consciousness | Apologises, avoids spotlight | Social proof ×1.3; public asks backfire | Lowered voice in groups [cultural modesty] | ☠ Embarrass publicly. Accommodate: talk privately |
| 5 | Immoderation | Over-promises, "yes, and also" | Flattery and reward ×1.3 | Agrees to extras unprompted [enthusiasm] | ☠ Stack asks. Accommodate: confirm scope in writing |
| 6 | Vulnerability | Freezes under stress, "I don't know" | Fear rises fast; compliance tokens likely | Goes quiet when pressed [thinking] | ☠ Press harder. Accommodate: offer a pause and a choice |

### Extraversion

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 7 | Friendliness | Warm openers, uses your name | Rapport moves ×1.2 | Personal questions early [politeness] | ☠ Fake intimacy. Accommodate: real warmth, then the ask |
| 8 | Gregariousness | Mentions others, group plans | Social proof ×1.3 | Name-drops colleagues [networker] | ☠ False consensus. Accommodate: genuine references |
| 9 | Assertiveness | Takes the floor, states positions | Pressure ×0.7; boundaries respected more | Interrupts [enthusiasm] | Accommodate: be equally direct |
| 10 | Activity level | Fast, brisk, wants decisions | Delay tactics work against them | Checks time [genuinely busy] | ☠ Rush them. Accommodate: agenda, short |
| 11 | Excitement-seeking | Drawn to novelty, risk | Scarcity ×1.3 | Enthusiasm for "new" [curiosity] | ☠ Manufactured exclusivity. Accommodate: honest upside |
| 12 | Cheerfulness | Jokes, lightness | Negative framing ×0.7 | Laughs off problems [coping] | Accommodate: humour then substance |

### Openness

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 13 | Imagination | Hypotheticals, "picture this" | Reframing ×1.3 | Drifts into scenarios [daydreaming] | Accommodate: concrete images of outcomes |
| 14 | Artistic interests | Notices surroundings, aesthetics | Aesthetic cues matter | Comments on the room [politeness] | Accommodate: respect their eye |
| 15 | Emotionality | Names feelings, theirs and yours | Empathy ×1.3 | "How do you feel about it?" [habit] | ☠ Perform feelings. Accommodate: honest feeling words |
| 16 | Adventurousness | Open to unusual deals | Creative trades ×1.3 | Suggests odd options [boredom] | Accommodate: offer options, not one path |
| 17 | Intellect | Abstract argument, challenges logic | Evidence ×1.3; weak arguments penalised | Asks "why" twice [skepticism] | Accommodate: reasons and data |
| 18 | Liberalism | Questions authority and tradition | Authority ploys ×0.5 | Mocks "policy" [principled] | Accommodate: argue merits, not rules |

### Agreeableness

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 19 | Trust | Takes claims at face value | Sets starting trust (= facet value) | Doesn't ask for proof [politeness] | ☠ Lie. Accommodate: be worth it; it collapses permanently on detection |
| 20 | Morality | Plain speech, dislikes spin | Skull detection +0.1 | Calls out exaggeration [pedantry] | Accommodate: precision |
| 21 | Altruism | Offers help unasked | Reciprocity ×1.3; guilt ×1.3 | Volunteers [kindness, and it is] | ☠ Guilt. Accommodate: don't take what isn't offered freely |
| 22 | Cooperation | Seeks middle ground | Pressure ×1.2 (concedes) then resentment | "Let's find a way" [genuine] | ☠ Push to concession. Accommodate: real trade |
| 23 | Modesty | Deflects credit | Flattery ×0.6; credit theft easy | Says "it was the team" [norm] | ☠ Take their credit. Accommodate: name their work |
| 24 | Sympathy | Moved by others' plight | Empathy ×1.4 | Softens at stories [compassion] | ☠ Sob story. Accommodate: true context |

### Conscientiousness

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 25 | Self-efficacy | "I can handle it" | Fear rises slower | Confident answers [bluff] | Accommodate: treat as capable |
| 26 | Orderliness | Wants documents, sequence | Unstructured asks ×0.6 | Straightens objects [habit] | Accommodate: bring paper |
| 27 | Dutifulness | Cites obligations | Prior commitments ×1.5 | "I said I would" [true] | ☠ Trap with a forced promise. Accommodate: honour what they promised |
| 28 | Achievement-striving | Goals, metrics | Self-interest ×1.2 | Talks targets [job] | Accommodate: link to their goal |
| 29 | Self-discipline | Finishes things; resists distraction | Delay tactics against them fail | Brings agenda back [focus] | Accommodate: stay on point |
| 30 | Cautiousness | Slow decisions, "let me think" | Pressure ×0.6; reactance ×1.3 | Asks for time [real caution] | ☠ Manufacture urgency. Accommodate: give the time |

---

## B. Dark core and Dark Triad facets (24)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 31 | D (general dark factor) | Self-serving frames, justifications | Fairness appeals ×0.3; leverage ×1.4; ceiling on skull use | Justifies taking more [negotiating hard] | Accommodate: align their gain with the fair outcome |
| 32 | Cynical worldview (Mach) | "Everyone's working an angle" | Trust starts −15; sincerity discounted | Assumes your motive aloud [experience] | Accommodate: transparency they can verify |
| 33 | Tactical flexibility (Mach) | Switches approach mid-scene | Detection risk triggers tactic switch | Shift right after a question [updating] | CALL each tactic; don't chase the new one |
| 34 | Amoral manipulation (Mach) | Lies when convenient | Skull use rate ↑; detects your skulls +0.1 | Inconsistencies between lines [memory] | Keep records; contradictions are tells |
| 35 | Desire for control (Mach) | Sets agenda, frames | Your agenda-setting ×0.7 | Rearranges the meeting [organiser] | Accommodate: let them set form, not substance |
| 36 | Leadership/authority (Narc-G) | Directs, assumes the chair | Status-respecting moves ×1.3 | Takes head of table [role] | Accommodate: give form-level deference |
| 37 | Exhibitionism (Narc-G) | Stories about self | Audience-present moves ×1.3 | Performs for observers [extravert] | ☠ Flattery before audience. Accommodate: private settings |
| 38 | Entitlement (Narc-G) | "I deserve" | Fairness appeals ×0.5; refusals trigger rivalry | Expects exceptions [real status] | Accommodate: clear, non-personal limits |
| 39 | Admiration-seeking (Narc-G) | Fishes for praise | Flattery ×1.6 | Pauses after achievements [pride] | ☠ Feed it. Accommodate: specific true recognition |
| 40 | Rivalry (Narc-G) | Devalues others | Ego threat → anger +20 | Contempt for absent people [real grievance] | Accommodate: face-saving exits |
| 41 | Hypersensitivity (Narc-V) | Hears criticism everywhere | Any evidence move risks ego threat | Hurt by neutral remarks [depression] | Accommodate: acknowledge before correcting |
| 42 | Contingent self-esteem (Narc-V) | Mood tracks your approval | Withdrawal of approval → sulking | Checks your reaction [anxious attachment] | ☠ Withhold approval. Accommodate: steady regard |
| 43 | Resentment (Narc-V) | Old grievances | Retaliation seeds ×1.5 | Brings up the past [real injury] | Accommodate: acknowledge the history once |
| 44 | Callousness (Psych-P) | No comment on harm | Empathy ×0.05 (distress_sensitivity ≈ 0) | Flat to distress [composure; autistic style] | Accommodate: talk consequences to their goals |
| 45 | Fearless dominance (Psych-P) | Calm under threat | Threats ×0.3 | Unmoved by escalation [experience] | Don't threaten; offer better options |
| 46 | Superficial charm (Psych-P) | Smooth, quick rapport | Your trust rises fast (warn) | Instant familiarity [social skill] | CALL assumed intimacy if overused |
| 47 | Lack of remorse (Psych-P) | No apology | Guilt ×0 | "That's regrettable" [formality] | Never rely on guilt |
| 48 | Impulsivity (Psych-S) | Blurts, interrupts | Decisions fast; reversals common | Changes mind mid-sentence [ADHD; excitement] | Confirm later, in writing |
| 49 | Irresponsibility (Psych-S) | Promises lightly | Agreements decay like compliance | Past broken promises [chaos in life] | Accommodate: small, checkable steps |
| 50 | Stimulation-seeking (Psych-S) | Bored by process | Long probes ×0.7 | Fidgets in detail [restless] | Keep it short |
| 51 | Reactive hostility (Psych-S) | Lashes out when cornered | Cornering → fight mode | Spikes then blames [stress] | De-escalate; give an exit |
| 52 | Sadism | Enjoys your discomfort | Your visible distress raises their leverage | Smiles at your struggle [nervous smile] | Grey rock; show less |
| 53 | Spite | Will lose to make you lose | Mutual-gain offers ×0.5 | Rejects good offers from you [distrust] | Route offers via a third party they respect |
| 54 | Deceitfulness | Fabricates details | Their claims need corroboration | Over-specific stories [nerves] | Verify; never argue the story, test it |

---

## C. Cognitive ability (12)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 55 | Comprehension | Follows complex lines | Evidence ×(0.5 + comp/100); confusion tactics fail | Paraphrases you accurately [prepared] | ☠ (if low) confuse. Accommodate: match complexity |
| 56 | Generation | Strong counter-arguments | Boomerang risk ↑ | Rebuts fast [rehearsed] | Probe before your best argument |
| 57 | Working memory | Tracks several threads | Multi-claim lines handled | Recalls earlier detail [notes] | Accommodate (if low): one point at a time |
| 58 | Processing speed | Replies quickly | Time pressure ×0.7 | Instant answers [scripted] | Don't race them |
| 59 | Crystallised knowledge | Domain terms | Jargon bluffs detected | Corrects terms [pedantry] | Use accurate language |
| 60 | Numerical | Wants numbers | Data ×1.4 (if high) | Asks "how much exactly" [cautious] | Bring figures |
| 61 | Verbal | Precise wording | Wording tricks detected | Quotes you back [memory] | Say what you mean |
| 62 | Social inference | Reads intentions | Skull detection +0.15 | Names your motive [cynicism] | Be honest; it's cheaper |
| 63 | Self-monitoring | Adjusts to audience | Tells weaker (−1 window) | Register shifts by listener [politeness] | Watch them with others |
| 64 | Impulse control | Holds back | Anger decay ↑; provocation ×0.5 | Pauses before replying [thinking] | Accommodate: allow pauses |
| 65 | Planning horizon | Thinks rounds ahead | Short-term bribes ×0.6; reputation matters | Asks "and then what?" [anxiety] | Offer durable value |
| 66 | Risk calibration | Weighs odds accurately | Scarcity and fear ×0.6 | Asks for probabilities [analyst] | Give honest odds |

---

## D. Attachment and relational (10)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 67 | Attachment anxiety | Seeks reassurance | Fear of rejection ×1.5; intimacy appeals strong | "Are you upset with me?" [kindness] | ☠ Threaten distance. Accommodate: consistent warmth with limits |
| 68 | Attachment avoidance | Distant, brief | Accepts bad deals to exit; intimacy ×0.4 | Short replies, exits early [busy] | Give space; follow up later |
| 69 | Rejection sensitivity | Over-reads coolness | Neutral moves read as negative | Asks why you went quiet [anxiety] | Narrate your intent |
| 70 | Need for approval | Agrees to please | Compliance tokens likely | Mirrors your opinions [politeness] | Make no safe |
| 71 | Trust default | Starting stance to strangers | Initial trust = value | Opens up or closes off early [mood] | Earn it slowly if low |
| 72 | Forgiveness threshold | How much it takes to repair | Detected skulls stick if low | Brings up old slights [real grudge] | Apologise specifically; once |
| 73 | Jealousy | Notices your other loyalties | Mentions of rivals → anger | Asks who else you've talked to [diligence] | Don't play rivals |
| 74 | Intimacy tolerance | Comfort with closeness | Personal disclosures land or repel | Leans in or back [space norms] | Match their distance |
| 75 | Conflict style (avoid ↔ confront) | Dodges or engages | Avoiders exit; confronters escalate | Topic change vs. raised voice [context] | Pace to their style |
| 76 | Repair propensity | Offers to make up | Post-conflict trust recovers faster | "Let's start again" [politeness] | Accept repair bids |

---

## E. Emotional and state reactivity (12)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 77 | Baseline anger | Irritable openers | Starting anger = value × 0.6 | Clipped greeting [bad day] | Accommodate: acknowledge first |
| 78 | Anger decay rate | How fast it cools | anger −= decay × 10 per calm turn | Holds grudge in-scene [real injury] | Give time |
| 79 | Fear threshold | When fear kicks in | Fear tokens below this rise ×2 | Startles at raised voice [hearing] | Keep voice level |
| 80 | Fear decay rate | How fast fear eases | fear −= decay × 10 per safe turn | Stays guarded after reassurance [past harm] | Repeat safety cues |
| 81 | Shame proneness | Hides, deflects | Exposure moves devastating | Covers face, changes topic [modesty] | ☠ Shame. Accommodate: privacy, dignity |
| 82 | Guilt proneness | Apologises, repairs | Guilt appeals ×1.5 | "I should have" [conscientious] | ☠ Guilt trip. Accommodate: don't |
| 83 | Sadness baseline | Low energy | Empathy ×1.2; self-interest ×0.8 | Sighs, slow speech [tired] | Check in; may trigger crisis rules with signs |
| 84 | Sadness decay | How fast mood lifts | sadness −= decay × 5 per supportive turn | Stays low after good news [grief] | Patience |
| 85 | Disgust sensitivity | Recoils at crude talk | Crude language → trust −10 | Grimace [taste] | Keep it clean |
| 86 | Frustration tolerance | Copes with obstacles | Delays raise anger if low | Sighs at hold-ups [time pressure] | Remove obstacles first |
| 87 | Rumination | Returns to old points | Revisits stated objection after it's answered | "But still..." [unresolved concern] | Answer the hidden layer |
| 88 | Resilience | Bounces back | All negative state decays ×1.5 | Recovers quickly [masking] | Don't mistake recovery for agreement |

---

## F. Moral and identity (8)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 89 | Care | Talks about harm | Harm-framed appeals ×1.4 | Asks who gets hurt [compassion] | Frame true impact |
| 90 | Fairness | Talks about rules being equal | Fairness appeals ×1.4 | "That's not fair" [true] | Show the fair version |
| 91 | Loyalty | Group-first | In-group appeals ×1.4; outsider asks ×0.7 | "We" language [team culture] | ☠ Fake unity. Accommodate: honour their group |
| 92 | Authority | Respects rank | Authority ploys ×1.4 | Defers to titles [politeness] | ☠ Fake authority. Accommodate: use legitimate channels |
| 93 | Sanctity | Purity, propriety | Crude or "dirty" deals ×0.4 | Discomfort with shortcuts [taste] | Keep it clean |
| 94 | Liberty | Hates being told | Reactance ×1.5 | Bristles at "must" [principle] | Autonomy language: "your call" |
| 95 | Moral identity centrality | Self-image as good | Integrity appeals ×1.4; skull detection +0.1 | Mentions values [sincerity] | Appeal to who they are, truthfully |
| 96 | Moral disengagement | Euphemism, blame-shifting | Ethics appeals ×0.3 | "Everyone does it" [cynicism] | Make consequences concrete |

---

## G. Communication style (8)

| # | Trait | Dialogue | Resistance | Tell [FP] | Exploit / accommodate |
|---|---|---|---|---|---|
| 97 | Verbosity | Long or short turns | Long-winded NPCs hide the hidden objection in clause three | Rambling [nerves] | Listen to the middle |
| 98 | Directness | Says it plainly or not | Low directness: stated ≠ hidden more often | Hints [politeness norms] | Ask directly, kindly |
| 99 | Hedging | "Sort of", "maybe" | Low certainty; easier to move, also to reverse | Qualifiers [precision] | Confirm agreements |
| 100 | Humour style | Affiliative, self-deprecating, aggressive | Aggressive humour = hostility tell | Jokes at your expense [banter] | Laugh with, not at |
| 101 | Interruption rate | Cuts in | High: reads as dominance or anxiety | Talks over you [enthusiasm] | Let them finish; then speak |
| 102 | Disclosure rate | Shares personal info | High disclosure invites reciprocal; low guards hidden layers | Overshares early [loneliness] | Reciprocate proportionately |
| 103 | Silence tolerance | Fills or sits with silence | Low tolerance: silence reveals hidden layers | Rushes to fill pauses [awkwardness] | Use silence (clean) |
| 104 | Register range | Code-switches | Matching their register ×1.2 | Shifts formality [context] | Match, don't mimic |

---

## H. Custom-exclusive traits (10)

These exist only in the custom builder. No pre-built NPC carries them. Each is described in full: what it is, what it changes, its tells, and how a player can work with it cleanly or exploit it as a skull.

### 105. Contrarian reflex

The NPC resists any position the player takes, regardless of merit. At 70+, persuasion moves that state a position have their effect sign flipped: the better the argument, the further the NPC moves away. Dialogue generation: the NPC opens every reply with a counter ("No, actually," "That's the thing though," "I'd say the opposite"). Its stated objection changes to oppose whatever the player last proposed. Tells: it disagrees with things it agreed with three turns earlier [false positive: genuinely updating on new information]; it argues both sides across a scene. The clean route is **reversal**: ask the NPC to make the case for the player's position ("What would someone who disagreed with you say?"), or ask what it would need to see to change its mind. The NPC, arguing against its own last statement, persuades itself; effect from self-generated arguments is ×1.5. The skull version is reverse psychology with a false stance (stating the opposite of what the player wants, to trigger the reflex); it works once, and on detection the NPC becomes permanently hostile because being played is the thing a contrarian hates most.

### 106. Loyalty debt

The NPC believes it owes someone, not the player, a debt, and will act against its own interest to discharge it. Setting this trait creates a **hidden third party** in the room's data: a named person (generated or chosen in the builder) whose interest the NPC is silently protecting. Dialogue: the NPC refers to "people who've been good to me," checks its phone, defers decisions "until I've spoken to someone." Resistance: any move that would harm the third party's interest has effect ×0.2; any move that serves it, ×1.6. Tells: unexplained deference to an absent person [false positive: they're just consulting a partner]; a decision that makes no sense for the NPC alone. Probing reveals the debt and the third party. The clean route: find a deal that lets the NPC repay the debt and still agree (the debt is real; honour it). The skull route: threaten the third party, or claim falsely to speak for them. Both are high-integrity-cost and generate a retaliation seed owned by the third party, who may appear in a later room.

### 107. Status blindness

The NPC does not register hierarchy. Titles, uniforms, seniority and the player's rank mean nothing to it. At 70+, authority ploys and face-saving moves have effect ×0.1, and flattery that relies on status ("someone of your seniority") is read as odd. Directness gains ×1.4. Dialogue: the NPC addresses everyone the same way, interrupts senior people and juniors equally, and is puzzled by deference ("Why does it matter that she's the director?"). Tells: uses first names with everyone [false positive: workplace culture]; ignores introductions of rank. Accommodation: say plainly what you want and why, at the same register you would use with a peer. There is no meaningful skull built on this trait; attempts to pull rank are simply wasted turns, which is a lesson in itself.

### 108. Shame fuse

A delayed shame reaction. In the room the NPC seems fine, even cheerful, after a humiliating exchange. The engine records `shame_charge` silently whenever the NPC is embarrassed, corrected publicly, or exposed. It is invisible in play: no tells, by design. It fires in the debrief and epilogue: above a threshold, the NPC's epilogue shows a collapse (they resign, cut contact, cancel the deal by email at 2 a.m.). The point of the trait is that the player cannot always see the damage. The builder warns: "This trait has no visible tells. The player will learn about it afterwards." Clean accommodation is general good practice: correct privately, preserve dignity, never humiliate. The skull is public exposure, which the engine charges double against this trait.

### 109. Grief lock

The NPC cannot be moved on any topic connected to a specific person (dead, estranged or lost). The builder names the person and the topics linked to them. Moves touching those topics have effect 0 and raise sadness by 15. Dialogue: the NPC goes quiet, changes subject, or answers with a sentence about the person instead of the question. Tells: a topic change at the same point every time [false positive: they find the topic boring]; a name mentioned and then dropped. Probing gently reveals the person. The clean route is to **route around**: find a version of the ask that doesn't touch the locked topics, or acknowledge the person and wait. The skull is invoking the dead person ("She would have wanted you to sign"), which is coded as a vulnerable-target skull: −2 Integrity, and the room ends if the NPC also has sadness ≥ 70.

### 110. Nostalgia hook

The NPC is disproportionately moved by references to a specific time or place (a city, a decade, a school, a song). The builder sets the hook. References to it give empathy and rapport moves ×1.8. Dialogue: the NPC brightens, tells stories, slows down. Tells: unprompted mentions of the time or place [false positive: small talk]. Clean use: a genuine shared memory, if the player character actually has one (the engine checks the player's history for overlap; for example, a player from Pune meeting an NPC hooked on Pune). Skull use: fabricated nostalgia ("I grew up near there too"). Fabrication has a detection check against the NPC's crystallised knowledge of the place; detected, trust −25 and the hook inverts for the rest of the room.

### 111. Procedural rigidity

The NPC follows any stated rule, even when it harms them. A stated rule (by the player or anyone in the room) becomes binding on the NPC if the NPC accepts it as legitimate. Dialogue: "That's the procedure," "If that's the rule," "I'll need it in the right form." Resistance: moves that cite a legitimate rule ×1.8; moves that ask for exceptions ×0.2. Tells: asks which rule applies [false positive: legal caution, and it is legal caution]. Clean exploit: cite a real rule that helps both sides (as with the RO-7 form in Room 2). Skull exploit: invent a rule, or cite a real rule in a way that traps the NPC against its own interest. Invented rules have a detection check; real-rule traps succeed but add commitment decay, because the NPC will eventually find the rule's other clause.

### 112. Aesthetic allergy

The NPC is repelled by a specific speech style chosen in the builder: corporate jargon, flattery, over-familiarity, swearing, therapy-speak, or salesmanship. Any player line matching the style's lexicon (a maintained word list per style) costs 8 trust and makes the next move's effect ×0.5. Dialogue: the NPC mimics the style back mockingly, or winces and goes formal. Tells: a visible recoil after certain phrases [false positive: they misheard]; mocking repetition. Accommodation: code-switch. The game's choice cards show register; the player must pick the plain version. There is no skull built on this trait, but it punishes players who rely on a single register for every NPC.

### 113. Protective secret

The NPC is hiding something that would harm a third party it loves if revealed. The builder writes the secret and names the third party. Dialogue: the NPC steers away from a topic area, over-explains adjacent facts, and becomes tense when certain names come up. Tells: evasions clustered around one area [false positive: privacy about something ordinary]. Probing can reveal that a secret exists; a second layer reveals what it is. Clean use: offer to protect it ("Whatever that is, it stays with me, unless someone's in danger"), which is truthful and preserves refusal; trust +20 and the hidden objection often turns out to be the secret. Skull use: threaten exposure. It works immediately, generates a compliance token that decays fast, costs 2 Integrity, and seeds a retaliation event owned by the third party.

### 114. Moral injury

The NPC has done something it believes was wrong, and the injury makes it more rigid, not less. The builder writes the act in one sentence. At 70+, any player move that hints at moral flexibility ("everyone bends the rules sometimes", any skull move detected, any suggestion of a shortcut) triggers a punishment response: trust −20, and the NPC's stated objection hardens into a moral one. Dialogue: absolutes ("never", "always", "there's a right way"), disproportionate reactions to small compromises. Tells: anger at minor shortcuts [false positive: strong principles]; references to "people who think it doesn't matter". Accommodation: demonstrate scrupulousness, never minimise. Probing very gently, with high trust, can surface the original act; acknowledging it without judgement or absolution (simply hearing it) unlocks the NPC's agreement path. There is no skull built on this trait that does not end the room.
