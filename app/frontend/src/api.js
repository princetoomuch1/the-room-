const BASE = import.meta.env.VITE_API_URL || "/api";

async function req(method, path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}

export const api = {
  newGame: (mode) => req("POST", "/games", { mode }),
  startRoom: (gid, room) => req("POST", `/games/${gid}/rooms/${room}`),
  choose: (gid, choice_id, cards) => req("POST", `/games/${gid}/choose`, { choice_id, cards }),
  tell: (gid, id) => req("POST", `/games/${gid}/tells/${id}`),
  object: (gid, id, look = 1) => req("POST", `/games/${gid}/objects/${id}?look=${look}`),
  cards: (gid) => req("GET", `/games/${gid}/cards`),
  debrief: (gid) => req("GET", `/games/${gid}/debrief`),
  ending: (gid) => req("GET", `/games/${gid}/ending`),
  crisis: (region) => req("GET", `/crisis-resources?region=${region}`),
};
