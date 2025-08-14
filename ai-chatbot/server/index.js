import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'AI Chatbot API' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages[] required' });
    }

    const chatMessages = [];
    if (systemPrompt) {
      chatMessages.push({ role: 'system', content: systemPrompt });
    }
    for (const m of messages) {
      // expect: { role: 'user'|'assistant', content: '...' }
      if (m?.role && m?.content) chatMessages.push(m);
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: chatMessages,
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "I'm not sure how to respond to that.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'OpenAI request failed',
      details: err?.message || 'unknown'
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
