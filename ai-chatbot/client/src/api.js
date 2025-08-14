// Update this to your deployed API URL in production, e.g.:
// const BASE = "https://your-backend.onrender.com";
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function sendMessage(messages, systemPrompt) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt })
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
