"""Tiny condition language used in content files.

Examples: "trust>=40", "revealed:overdraft", "!revealed:overdraft", "flag:visitor_log_checked",
"reactance>=0.8", "anger<=30 && trust>=40", "a || b", "turn<6", "hand:winning",
"hand:contains:card_priya_compliance", "win_condition".
"""
from __future__ import annotations

import re

_CMP = re.compile(r"^([a-z_]+)\s*(>=|<=|==|>|<)\s*(-?[0-9.]+)$")


def evaluate(expr: str | None, ctx) -> bool:
    if expr is None or expr is True:
        return True
    expr = expr.strip()
    if "||" in expr:
        return any(evaluate(p, ctx) for p in expr.split("||"))
    if "&&" in expr:
        return all(evaluate(p, ctx) for p in expr.split("&&"))
    if expr.startswith("!"):
        return not evaluate(expr[1:], ctx)
    if expr.startswith("revealed:"):
        return expr.split(":", 1)[1] in ctx.revealed
    if expr.startswith("flag:"):
        return expr.split(":", 1)[1] in ctx.flags
    if expr.startswith("hand:contains:"):
        return expr.split(":", 2)[2] in ctx.presented
    if expr == "hand:winning":
        return ctx.hand_is("winning")
    if expr == "hand:partial":
        return ctx.hand_is("partial")
    if expr == "win_condition":
        return ctx.mirror_win()
    m = _CMP.match(expr)
    if m:
        name, op, val = m.group(1), m.group(2), float(m.group(3))
        cur = ctx.value(name)
        return {">=": cur >= val, "<=": cur <= val, "==": cur == val, ">": cur > val, "<": cur < val}[op]
    return expr in ctx.flags
