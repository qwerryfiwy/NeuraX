'use client'

import { motion } from 'framer-motion'

export default function MessageBubble({
  text,
  role,
  index
}: {
  text: string
  role: 'user' | 'ai'
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`pl-2 pr-2 rounded-xl max-w-[95%] ${
        role === 'user'
          ? 'bg-surface self-end text-right'
          : 'bg-accent/10 self-start text-left'
      }`}
    >
      {text}
    </motion.div>
  )
}
