'use client'
import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="fixed 
      inset-0 
      z-50
    bg-black
     text-white 
     flex 
     items-center 
     justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-7xl font-black 
        tracking-wider 
        flex 
        space-x-[-1rem]"
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.1, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }}
      >
        <motion.span
          className="text-purple-500"
          animate={{
            x: [-10, 0, 10, 0],
            opacity: [0.5, 1, 0.8, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          N
        </motion.span>
        <motion.span
          className="text-blue-500"
          animate={{
            x: [10, 0, -10, 0],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          X
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
