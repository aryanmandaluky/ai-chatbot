# AI Chatbot with Memory (React + Node)

A full-stack AI chatbot with a clean UI, system prompt control, and persisted chat history.

## Tech
- Frontend: React (Vite) + Tailwind
- Backend: Node + Express
- LLM: OpenAI API (`gpt-4o-mini`)

## Features
- Persistent chat history (localStorage)
- System prompt customization (tone/role)
- Responsive layout and smooth UX

## Local Setup
```bash
# backend
cd server
cp .env.example .env   # set OPENAI_API_KEY
npm install
npm run dev

# frontend
cd ../client
npm install
npm run dev
```

## Deploy
- **Backend**: Render (Web Service) → set env `OPENAI_API_KEY`
- **Frontend**: Vercel → set env `VITE_API_BASE` to your backend URL

## Screenshots
_Add screenshots of the UI here_

## Resume Snippet
- Developed and deployed a full-stack AI chatbot using React, Node, and OpenAI API.
- Implemented persistent conversation memory and customizable system prompts.
- Deployed via Vercel (frontend) and Render (backend), enabling public demo access.

## License
MIT
