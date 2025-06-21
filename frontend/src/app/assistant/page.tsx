'use client'

import { useState } from 'react'
import MessageBubble from '@/app/assistant/MessageBubble'
import InputBar from '@/app/assistant/InputBar'
import { useEffect, useRef } from 'react'

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hey there! Ask me anything about Deep Learning.' }
  ])
  const [input, setInput] = useState('')

 const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { role: 'user', text: input };
  setMessages(prev => [...prev, userMsg]);
  setInput('');

  setMessages(prev => [...prev, { role: 'ai', text: ' Thinking...' }]);

  try {
    const res = await fetch('http://localhost:8001/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    
    setMessages(prev => [
      ...prev.slice(0, -1),
      { role: 'ai', text: data.reply }
    ]);
  } catch (err) {
    setMessages(prev => [
      ...prev.slice(0, -1),
      { role: 'ai', text: ' Error: Failed to fetch from backend.' }
    ]);
  }
};

const bottomRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
}, [messages])


  return (
    <div className="flex flex-col h-screen bg-background text-white px-4 py-6 overflow-hidden w-[100%]">
      <h1 className="text-3xl font-bold mb-4 text-accent text-center"> NeuraX Assistant</h1>

      <div className="flex-1 
  overflow-y-auto 
  space-y-4 
  p-2 
  scrollbar-thin 
  scrollbar-thumb-transparent 
  scrollbar-track-transparent 
  hover:scrollbar-thumb-accent/30 
  transition-all duration-300"
        >
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} index={i} />
        ))}
         <div ref={bottomRef} />
      </div>

      <InputBar input={input} setInput={setInput} onSend={handleSend} />
    </div>
  )
}
