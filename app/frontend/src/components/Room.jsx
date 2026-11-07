import { useState } from "react";
import { api } from "../api";

export default function Room({ view, gameId, onAct }) {
  const [reading, setReading] = useState(null);
  const [cards, setCards] = useState([]);
  const [picking, setPicking] = useState(null);
  const [picked, setPicked] = useState([]);

  async function clickTell(t) {
    const r = await api.tell(gameId, t.id);
    if (r.ok) setReading(r);
  }

  async function choose(c) {
    setReading(null);
    if (c.action === "present_evidence") {
      setCards(await api.cards(gameId));
      setPicking(c);
      return;
    }
    await onAct(() => api.choose(gameId, c.id));
  }

  async function present() {
    await onAct(() => api.choose(gameId, picking.id, picked));
    setPicking(null);
    setPicked([]);
  }

  return (
    <section className={`room room-${view.room}`}>
      <header>
        <h2 className="lettered">{view.title}</h2>
        <div className="insight" aria-label={`Insight ${view.insight}`}>
          {"●".repeat(Math.max(0, view.insight))}
        </div>
      </header>

      <figure className="canvas" aria-hidden="true" />

      <blockquote className={view.speaker === "architect" ? "architect" : "line"}>
        {view.line}
      </blockquote>

      {view.tells.length > 0 && (
        <ul className="tells" aria-label="Possible tells">
          {view.tells.map((t) => (
            <li key={t.id}>
              <button className="tell" onClick={() => clickTell(t)} aria-label={`Possible tell: ${t.anchor}`}>
                ✦ {t.anchor?.replace(/^(phrase|gesture):/, "")}
              </button>
            </li>
          ))}
        </ul>
      )}

      {reading && (
        <aside className="reading">
          <p><strong>One reading:</strong> {reading.reading}</p>
          {reading.false_positive && <p><strong>Another:</strong> {reading.false_positive}</p>}
        </aside>
      )}

      {picking ? (
        <div className="cards">
          <p className="architect">Choose up to {picking.max_cards}.</p>
          {cards.map((c) => (
            <label key={c.id} className="card">
              <input type="checkbox" checked={picked.includes(c.id)}
                onChange={(e) => setPicked(e.target.checked ? [...picked, c.id].slice(0, picking.max_cards)
                  : picked.filter((x) => x !== c.id))} />
              <span>{c.label}</span>
            </label>
          ))}
          <button onClick={present} disabled={!picked.length}>Put them on the table</button>
        </div>
      ) : (
        <ol className="choices">
          {view.choices.map((c) => (
            <li key={c.id}>
              <button className={`choice ${c.skull ? "skull" : ""} ${c.strong ? "strong" : ""}`} onClick={() => choose(c)}>
                {c.skull && <span className="skull-mark" aria-label="skull move">☠</span>}
                {c.text}
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
