import React from 'react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 shadow-sm ${
          isUser ? 'bg-blue-100' : 'bg-white border'
        }`}
      >
        <div className="text-xs text-gray-500 mb-1">{isUser ? 'You' : 'Assistant'}</div>
        <div className="whitespace-pre-wrap text-sm">{content}</div>
      </div>
    </div>
  );
}
