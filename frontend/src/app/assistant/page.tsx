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

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    const botMsg = { role: 'ai', text: "I'm thinking..." }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

const bottomRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
}, [messages])


  return (
    <div className="flex flex-col h-screen bg-background text-white px-4 py-6">
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
