'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DocsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    const res = await fetch('http://localhost:8001/upload-doc', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setSummary(data.summary || 'No summary returned.')
    setAnswer('')
    setLoading(false)
  }

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)

    const res = await fetch('http://localhost:8001/ask-doc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setAnswer(data.answer || 'No answer returned.')
    setLoading(false)
  }

  return (
    <main className="min-h-screen 
    bg-gradient-to-br from-[#0f0f10] via-[#101822] to-[#05080f] 
    text-white 
    p-8 flex flex-col 
    items-center justify-start">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold 
        bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 
        text-transparent bg-clip-text drop-shadow mb-6"
      >
         NeuraX Docs
      </motion.h1>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border
         border-white/10 shadow-md w-full max-w-2xl mb-8"
      >
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full text-sm bg-black/20 
          file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white 
          hover:file:brightness-110 transition-all"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full bg-accent py-2 rounded-lg 
          font-semibold hover:scale-105 
          transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Upload & Summarize'}
        </button>
      </motion.div>

      {/* Summary Display */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 
          shadow-md w-full max-w-3xl mb-8"
        >
          <h2 className="text-xl font-bold text-accent mb-2"> Summary</h2>
          <p className="text-stone-300 whitespace-pre-wrap">{summary}</p>
        </motion.div>
      )}

      {/* Q&A Section */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-md w-full max-w-3xl"
        >
          <h2 className="text-xl font-bold text-accent mb-2"> Ask Anything</h2>
          <input
            type="text"
            placeholder="e.g. What is the main topic of this document?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent mb-4"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="w-full bg-accent py-2 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
          {answer && (
            <div className="mt-4 text-stone-200">
              <h3 className="font-semibold text-lg mb-1"> Answer:</h3>
              <p className="whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </motion.div>
      )}
    </main>
  )
}
