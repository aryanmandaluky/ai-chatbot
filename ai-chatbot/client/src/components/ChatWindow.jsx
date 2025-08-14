import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble.jsx';

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          Start the conversation…
        </div>
      )}
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
