"""The effect formula, implemented exactly as specified in the design bible §3.2.

    effect     = base(type) × trait_mult(NPC, type) × state_mod − reactance
    reactance  = freedom_threat(move) × (1 + trait_reactance(NPC)) × repeat_count
    if detected_skull: effect = −|effect|; trust −= BIG; wariness spreads to contacts
"""
from __future__ import annotations

from dataclasses import dataclass

BASE = {
    "evidence": 10.0,
    "empathy": 8.0,
    "self_interest": 9.0,
    "probe": 4.0,
    "social_proof": 6.0,
    "flattery": 6.0,
    "pressure": 12.0,
    "scarcity": 10.0,
    "naming": 7.0,
    "boundary": 8.0,
    "silence": 3.0,
    "refusal": 8.0,
    "call": 0.0,
    "concession": 0.0,
}

DEFAULT_FREEDOM_THREAT = {
    "probe": 0.0, "silence": 0.0, "evidence": 0.0, "empathy": 0.0,
    "self_interest": 0.2, "social_proof": 0.2, "flattery": 0.0,
    "scarcity": 0.6, "pressure": 0.9, "naming": 0.1, "boundary": 0.0,
    "refusal": 0.0, "call": 0.0, "concession": 0.0,
}

BOUNDARY_TYPES = {"boundary", "refusal", "silence"}

BIG_TRUST_HIT = 15.0
CALL_WEAKEN = 0.25
CALL_INSIGHT = 2
CALL_WRONG_TRUST = 10.0
BOOMERANG_UP = 15.0
WEAK_REBUTTAL_DOWN = 10.0
STATED_MULT = 0.30
HIDDEN_MULT = 1.50


def clamp(x: float, lo: float = 0.0, hi: float = 100.0) -> float:
    return max(lo, min(hi, x))


def base(move_type: str) -> float:
    return BASE.get(move_type, 0.0)


def freedom_threat(move: dict) -> float:
    if "freedom_threat" in move:
        return float(move["freedom_threat"])
    return DEFAULT_FREEDOM_THREAT.get(move.get("type", ""), 0.0)


def trait_reactance(f: dict) -> float:
    """0..~1.5. Liberty, cautiousness, narcissism and low agreeableness raise reactance."""
    liberty = f.get("liberty", 50)
    caution = f.get("cautiousness", 50)
    narc = f.get("narc", 50)
    agree = f.get("A", 50)
    raw = 0.4 * liberty + 0.2 * caution + 0.25 * narc + 0.15 * (100 - agree)
    return raw / 100.0


def trait_mult(f: dict, move_type: str) -> float:
    """Multiplier from the NPC's factor scores (0..100). Directions per dossier cheat sheet."""
    A, N, O, C = f.get("A", 50), f.get("N", 50), f.get("O", 50), f.get("C", 50)
    D, psych, narc, mach = f.get("D", 50), f.get("psych", 50), f.get("narc", 50), f.get("mach", 50)
    iq = f.get("IQ", 50)
    distress = f.get("distress_sensitivity", 100 - psych)
    if move_type == "empathy":
        return max(0.02, (distress / 100.0) * (0.6 + 0.4 * (A + N) / 100.0))
    if move_type == "self_interest":
        return 0.7 + 0.4 * (D / 100.0) + 0.3 * (psych / 100.0)
    if move_type == "evidence":
        return 0.5 + 0.5 * (iq / 100.0) + 0.3 * (O / 100.0)
    if move_type in ("pressure", "scarcity"):
        m = 0.6 + 0.8 * (N / 100.0)
        m -= 0.4 * max(0.0, (narc - 50) / 50.0)
        m -= 0.3 * max(0.0, (C - 50) / 50.0)
        return max(0.1, m)
    if move_type == "flattery":
        m = 0.6 + 0.6 * (narc / 100.0) + 0.3 * (A / 100.0)
        if iq >= 70 and mach >= 70:
            m = -0.5  # read as a tell; backfires
        return m
    if move_type == "social_proof":
        return 0.6 + 0.4 * (A / 100.0) + 0.2 * (f.get("gregariousness", 50) / 100.0)
    if move_type == "probe":
        return 1.0
    return 1.0


def state_mod(state: dict, move_type: str, player_certainty: float) -> float:
    if move_type in BOUNDARY_TYPES:
        return 1.0 + player_certainty / 100.0
    trust = state.get("trust", 50.0)
    fatigue = state.get("fatigue", 0.0)
    return (0.5 + trust / 100.0) * (1.0 - fatigue / 200.0)


def reactance(move: dict, factors: dict, repeat_count: int) -> float:
    return freedom_threat(move) * (1.0 + trait_reactance(factors)) * max(1, repeat_count)


@dataclass
class EffectResult:
    effect: float
    reactance: float
    detected: bool
    multiplier_note: str = ""


def compute_effect(move: dict, factors: dict, state: dict, player_certainty: float,
                   repeat_count: int, detected_skull: bool = False,
                   objective_mult: float = 1.0, tactic_weaken: float = 1.0) -> EffectResult:
    """The formula. `objective_mult` applies the stated (0.3) / hidden (1.5) rule.
    `tactic_weaken` applies a CALL's ×0.25 to a weakened tactic."""
    t = move.get("type", "")
    r = reactance(move, factors, repeat_count)
    e = base(t) * trait_mult(factors, t) * state_mod(state, t, player_certainty) - r
    e *= objective_mult * tactic_weaken * float(move.get("effect_multiplier", 1.0))
    if detected_skull:
        e = -abs(e)
    return EffectResult(effect=e, reactance=r, detected=detected_skull)


def p_detect(factors: dict, wariness_flags: int) -> float:
    comp = factors.get("comprehension", factors.get("IQ", 50))
    mach = factors.get("mach", 50)
    return min(0.9, 0.15 + 0.004 * comp + 0.003 * mach + 0.1 * wariness_flags)


def token_for(state: dict) -> str:
    return "agreement" if state.get("trust", 0) >= 60 and state.get("fear", 100) <= 35 else "compliance"


def p_backout(state: dict) -> float:
    return clamp(0.35 + state.get("fear", 0) / 200.0 - state.get("trust", 0) / 300.0, 0.0, 1.0)
