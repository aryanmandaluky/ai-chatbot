import React from 'react';

export default function TopBar({ systemPrompt, setSystemPrompt, onClear }) {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-3 items-center">
        <div className="font-semibold text-lg">AI Chatbot</div>
        <div className="flex-1" />
        <button
          onClick={onClear}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          title="Clear conversation"
        >
          Clear
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-3">
        <label className="block text-sm text-gray-600 mb-1">
          System Prompt (sets the bot’s role/tone)
        </label>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={2}
          className="w-full border rounded p-2 text-sm"
          placeholder="You are a helpful, concise assistant."
        />
      </div>
    </div>
  );
}
