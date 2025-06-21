'use client'

export default function InputBar({
  input,
  setInput,
  onSend
}: {
  input: string
  setInput: (val: string) => void
  onSend: () => void
}) {
  return (
    <div className="mt-4 flex gap-2">
      <input
        className="flex-1 bg-surface text-white p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder="Ask me about Deep Learning..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button
        onClick={onSend}
        className="bg-accent text-stone-300 px-5 rounded-lg font-semibold hover:scale-105 transition-transform"
      >
        Send
      </button>
    </div>
  )
}
