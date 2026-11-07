import { useEffect, useState } from "react";
import { api } from "./api";
import ContentNote from "./components/ContentNote";
import CrisisResources from "./components/CrisisResources";
import Debrief from "./components/Debrief";
import Room from "./components/Room";

const ROOM_ORDER = ["room1_kitchen", "room2_desk", "room3_table", "war_room", "room9_mirror"];

export default function App() {
  const [game, setGame] = useState(null);
  const [view, setView] = useState(null);
  const [debrief, setDebrief] = useState(null);
  const [pendingRoom, setPendingRoom] = useState(null);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(localStorage.getItem("sm_region") || "IN");

  useEffect(() => { try { localStorage.setItem("sm_region", region); } catch {} }, [region]);

  async function newGame(mode) {
    setError(null);
    const g = await api.newGame(mode);
    setGame(g);
    setDebrief(null);
    setView(null);
  }

  async function openRoom(roomId) {
    setDebrief(null);
    const v = await api.startRoom(game.game_id, roomId);
    if (v.content_note?.required) { setPendingRoom(v); return; }
    setView(v);
  }

  async function act(fn) {
    try {
      const v = await fn();
      if (v && v.room) setView(v);
      if (v && v.ended) setDebrief(await api.debrief(game.game_id));
      return v;
    } catch (e) { setError(String(e)); }
  }

  if (!game) {
    return (
      <main className="antechamber">
        <h1 className="lettered">Sovereign Mind</h1>
        <p className="architect">The Room. Choose how hard the doors are.</p>
        <div className="row">
          {["medium", "hard", "brutal"].map((m) => (
            <button key={m} className="door" onClick={() => newGame(m)}>{m}</button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      {error && <div className="error" role="alert">{error}</div>}
      {pendingRoom && (
        <ContentNote note={pendingRoom.content_note} region={region}
          onContinue={() => { setView(pendingRoom); setPendingRoom(null); }}
          onSkip={() => { setPendingRoom(null); openRoom(pendingRoom.content_note.skip_routes_to); }} />
      )}
      {!view && !pendingRoom && (
        <section className="antechamber">
          <h2 className="lettered">Antechamber</h2>
          <div className="row">
            {ROOM_ORDER.filter((r) => game.rooms.includes(r)).map((r) => (
              <button key={r} className="door" onClick={() => openRoom(r)}>{r.replace(/_/g, " ")}</button>
            ))}
          </div>
        </section>
      )}
      {view && !debrief && (
        <Room view={view} gameId={game.game_id} onAct={act} />
      )}
      {debrief && (
        <Debrief data={debrief} onLeave={() => { setDebrief(null); setView(null); }} />
      )}
      {(view?.crisis_resources_visible || debrief?.crisis_resources_visible || pendingRoom) && (
        <CrisisResources region={region} onRegion={setRegion} />
      )}
    </main>
  );
}
