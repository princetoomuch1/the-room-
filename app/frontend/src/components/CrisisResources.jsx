import { useEffect, useState } from "react";
import { api } from "../api";

export default function CrisisResources({ region, onRegion }) {
  const [data, setData] = useState(null);
  useEffect(() => { api.crisis(region).then(setData).catch(() => setData(null)); }, [region]);
  return (
    <aside className="crisis" aria-label="Support">
      <strong>If this is close to home, support is available now.</strong>
      {onRegion && (
        <select value={region} onChange={(e) => onRegion(e.target.value)} aria-label="Region">
          <option value="IN">India</option><option value="US">United States</option><option value="GB">UK and Ireland</option>
        </select>
      )}
      <ul>
        {data?.entries?.flatMap((e) => e.services.map((s) => (
          <li key={s.name}>{s.name}: <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>
            {s.alt_phone && <> or <a href={`tel:${s.alt_phone.replace(/[\s-]/g, "")}`}>{s.alt_phone}</a></>} ({s.hours})</li>
        )))}
      </ul>
    </aside>
  );
}
