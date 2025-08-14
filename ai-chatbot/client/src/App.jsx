import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import { sendMessage } from './api.js';

const LS_KEY = 'ai_chatbot_messages';
const LS_SYS = 'ai_chatbot_system';

export default function App() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [systemPrompt, setSystemPrompt] = useState(
    localStorage.getItem(LS_SYS) || 'You are a helpful, concise assistant.'
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LS_SYS, systemPrompt);
  }, [systemPrompt]);

  const onClear = () => {
    setMessages([]);
  };

  const onSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await sendMessage(next, systemPrompt);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error contacting server. Check console and API.' }
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} onClear={onClear} />
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col bg-gray-50 border-x">
        <ChatWindow messages={messages} />

        <form onSubmit={onSend} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <textarea
              className="flex-1 border rounded p-2 text-sm h-24"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="px-4 py-2 border rounded self-end disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Thinking…' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
