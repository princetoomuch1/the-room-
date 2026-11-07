"""Sovereign Mind: The Room — game API (FastAPI)."""
from __future__ import annotations

import json
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from engine.content import CONTENT_DIR, crisis_resources, list_rooms
from engine.session import Game, RoomRun

app = FastAPI(title="Sovereign Mind: The Room", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
                   allow_methods=["*"], allow_headers=["*"])

GAMES: dict[str, Game] = {}
RUNS: dict[str, RoomRun] = {}


class NewGame(BaseModel):
    mode: str = "medium"
    seed: int | None = None


class Choose(BaseModel):
    choice_id: str
    cards: list[str] | None = None


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/games")
def new_game(body: NewGame):
    if body.mode not in ("medium", "hard", "brutal"):
        raise HTTPException(400, "mode must be medium, hard or brutal")
    g = Game(mode=body.mode, seed=body.seed if body.seed is not None else int.from_bytes(os.urandom(4), "big"))
    GAMES[g.id] = g
    return {"game_id": g.id, "mode": g.mode, "rooms": list_rooms()}


def _game(gid: str) -> Game:
    if gid not in GAMES:
        raise HTTPException(404, "game not found")
    return GAMES[gid]


def _run(gid: str) -> RoomRun:
    if gid not in RUNS:
        raise HTTPException(409, "no room in progress")
    return RUNS[gid]


@app.post("/games/{gid}/rooms/{room_id}")
def start_room(gid: str, room_id: str):
    g = _game(gid)
    if room_id not in list_rooms():
        raise HTTPException(404, f"room {room_id} has no content yet")
    RUNS[gid] = RoomRun(g, room_id)
    return RUNS[gid].view()


@app.get("/games/{gid}/room")
def current(gid: str):
    return _run(gid).view()


@app.post("/games/{gid}/choose")
def choose(gid: str, body: Choose):
    run = _run(gid)
    try:
        return run.choose(body.choice_id, body.cards)
    except ValueError as e:
        raise HTTPException(400, str(e))


@app.post("/games/{gid}/tells/{tell_id}")
def click_tell(gid: str, tell_id: str):
    return _run(gid).click_tell(tell_id)


@app.post("/games/{gid}/objects/{object_id}")
def examine(gid: str, object_id: str, look: int = 1):
    return _run(gid).examine(object_id, look)


@app.get("/games/{gid}/cards")
def cards(gid: str):
    run = _run(gid)
    defs = run.room.get("evidence_cards", {})
    return [{"id": c, **{k: defs.get(c, {}).get(k) for k in ("label", "proves")}} for c in sorted(run.cards)]


@app.get("/games/{gid}/debrief")
def debrief(gid: str):
    run = _run(gid)
    if not run.ended:
        raise HTTPException(409, "room still in progress")
    return run.debrief()


@app.get("/games/{gid}/ending")
def ending(gid: str):
    g = _game(gid)
    return {"ending": g.ending(), "calls_made": g.calls_made}


@app.get("/crisis-resources")
def crisis(region: str | None = None):
    return crisis_resources(region)


@app.get("/library")
def library(q: str = "", module: str | None = None, level: str | None = None, risk: str | None = None):
    p = Path(CONTENT_DIR) / "library" / "entries.json"
    if not p.exists():
        return {"entries": [], "note": "Library not imported. Run scripts/import_library.py with Deliverable 1."}
    entries = json.loads(p.read_text(encoding="utf-8"))
    ql = q.lower()
    out = [e for e in entries
           if (not ql or ql in (e.get("title", "") + e.get("summary", "")).lower())
           and (not module or e.get("module") == module)
           and (not level or e.get("level") == level)
           and (not risk or e.get("risk") == risk)]
    return {"entries": out[:200], "total": len(out)}
