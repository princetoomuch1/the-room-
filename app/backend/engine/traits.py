"""Facet → factor collapse. 104 standard facets + 10 custom-exclusive (docs/05_trait_library.md)."""
from __future__ import annotations

FACETS = {
    "N": ["anxiety", "anger_n", "depression", "self_consciousness", "immoderation", "vulnerability"],
    "E": ["friendliness", "gregariousness", "assertiveness", "activity_level", "excitement_seeking", "cheerfulness"],
    "O": ["imagination", "artistic_interests", "emotionality", "adventurousness", "intellect", "liberalism"],
    "A": ["trust", "morality", "altruism", "cooperation", "modesty", "sympathy"],
    "C": ["self_efficacy", "orderliness", "dutifulness", "achievement_striving", "self_discipline", "cautiousness"],
    "D": ["d_general"],
    "mach": ["cynical_worldview", "tactical_flexibility", "amoral_manipulation", "desire_for_control"],
    "narc_grandiose": ["leadership_authority", "exhibitionism", "entitlement", "admiration_seeking", "rivalry"],
    "narc_vulnerable": ["hypersensitivity", "contingent_self_esteem", "resentment"],
    "psych_primary": ["callousness", "fearless_dominance", "superficial_charm", "lack_of_remorse"],
    "psych_secondary": ["impulsivity", "irresponsibility", "stimulation_seeking", "reactive_hostility"],
    "dark_ext": ["sadism", "spite", "deceitfulness"],
    "IQ": ["comprehension", "generation", "working_memory", "processing_speed", "crystallised_knowledge",
           "numerical", "verbal", "social_inference", "self_monitoring", "impulse_control",
           "planning_horizon", "risk_calibration"],
    "attachment": ["attachment_anxiety", "attachment_avoidance", "rejection_sensitivity", "need_for_approval",
                   "trust_default", "forgiveness_threshold", "jealousy", "intimacy_tolerance",
                   "conflict_style", "repair_propensity"],
    "emotion": ["baseline_anger", "anger_decay", "fear_threshold", "fear_decay", "shame_proneness",
                "guilt_proneness", "sadness_baseline", "sadness_decay", "disgust_sensitivity",
                "frustration_tolerance", "rumination", "resilience"],
    "moral": ["care", "fairness", "loyalty", "authority", "sanctity", "liberty",
              "moral_identity_centrality", "moral_disengagement"],
    "comm": ["verbosity", "directness", "hedging", "humour_style", "interruption_rate",
             "disclosure_rate", "silence_tolerance", "register_range"],
}

CUSTOM_EXCLUSIVE = ["contrarian_reflex", "loyalty_debt", "status_blindness", "shame_fuse", "grief_lock",
                    "nostalgia_hook", "procedural_rigidity", "aesthetic_allergy", "protective_secret",
                    "moral_injury"]

STANDARD = [f for group in FACETS.values() for f in group]
assert len(STANDARD) == 104, len(STANDARD)
ALL_TRAITS = STANDARD + CUSTOM_EXCLUSIVE


def _mean(xs):
    return sum(xs) / len(xs) if xs else 50.0


def factors(traits: dict) -> dict:
    """Collapse facets into factor scores. Explicit factor values in `traits` override."""
    t = {k: float(v) for k, v in traits.items()}
    out: dict = {}
    for key in ("N", "E", "O", "A", "C", "mach"):
        out[key] = t.get(key, _mean([t.get(f, 50.0) for f in FACETS[key]]))
    out["D"] = t.get("D", t.get("d_general", 50.0))
    ng = t.get("narc_grandiose", _mean([t.get(f, 50.0) for f in FACETS["narc_grandiose"]]))
    nv = t.get("narc_vulnerable", _mean([t.get(f, 50.0) for f in FACETS["narc_vulnerable"]]))
    out["narc"] = t.get("narc", max(ng, nv))
    pp = t.get("psych_primary", _mean([t.get(f, 50.0) for f in FACETS["psych_primary"]]))
    ps = t.get("psych_secondary", _mean([t.get(f, 50.0) for f in FACETS["psych_secondary"]]))
    out["psych"] = t.get("psych", max(pp, ps))
    out["IQ"] = t.get("IQ", _mean([t.get(f, 50.0) for f in ("comprehension", "generation", "working_memory")]))
    out["comprehension"] = t.get("comprehension", out["IQ"])
    out["distress_sensitivity"] = t.get("distress_sensitivity", 100.0 - t.get("callousness", out["psych"]))
    for passthrough in ("liberty", "cautiousness", "gregariousness", "trust", "silence_tolerance"):
        if passthrough in t:
            out[passthrough] = t[passthrough]
    return out


def starting_state(traits: dict) -> dict:
    f = factors(traits)
    return {
        "trust": float(traits.get("trust", traits.get("trust_default", 50.0))),
        "fear": float(traits.get("fear", 20.0)),
        "anger": float(traits.get("baseline_anger", 30.0)) * 0.6,
        "sadness": float(traits.get("sadness_baseline", 20.0)),
        "fatigue": 0.0,
        "resistance": 70.0,
        "certainty": 50.0,
        "_factors": f,
    }
