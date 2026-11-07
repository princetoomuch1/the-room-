export default function Debrief({ data, onLeave }) {
  const tokens = Object.entries(data.tokens || {});
  return (
    <section className="debrief" aria-label="Debrief">
      <h2 className="lettered">Debrief</h2>
      <p className="architect">Room closed. {data.end}.</p>

      <h3>Tells you missed</h3>
      {data.missed_tells.length ? <ul>{data.missed_tells.map((t) => <li key={t}>{t}</li>)}</ul> : <p>None.</p>}

      <h3>What was underneath</h3>
      {data.hidden_not_surfaced.length
        ? <ul>{data.hidden_not_surfaced.map((h) => <li key={h}>{h}</li>)}</ul>
        : <p>You found it.</p>}

      <h3>What you actually got</h3>
      <ul>{tokens.map(([npc, tok]) => <li key={npc}>{npc}: {tok}</li>)}</ul>

      {data.cards_gathered && (<><h3>Evidence gathered</h3><ul>{data.cards_gathered.map((c) => <li key={c}>{c}</li>)}</ul></>)}

      <h3>Afterwards</h3>
      {data.afterword?.line
        ? <p className="afterword">{data.afterword.speaker}, to {data.afterword.to}: "{data.afterword.line}"</p>
        : <p className="afterword">{data.afterword?.note || "Nobody mentioned you."}</p>}

      <button onClick={onLeave}>Leave</button>
    </section>
  );
}
