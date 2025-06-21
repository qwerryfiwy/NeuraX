'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link'
import Preloader from '@/preloader'

const features = [
  {
    name: 'Assistant',
    desc: 'Ask me anything about Deep Learning.',
    image: '/assistant.gif',
    href: '/assistant',
  },
  {
    name: 'Docs',
    desc: 'Upload docs, get instant answers and summaries.',
    image: '/docs.gif',
    href: '/docs',
  },
]

export default function HomePage() {
    const [loading, setLoading] = useState(true)
    
    
    useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1800) // Adjust the delay as needed
    return () => clearTimeout(timeout)
  }, [])

  return (<>
  {loading ?(
    <Preloader/>
  ):(
    <main className="
    bg-[radial-gradient(circle_at_center,_#0f0f10,_#05050a,_#0d1a2b)] 
    flex 
    flex-col 
    items-center 
    justify-center 
    min-h-screen 
    bg-background
  text-white px-4">
      <motion.h1
        className="text-5xl 
        font-extrabold 
        bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 
        text-transparent
        bg-clip-text 
        drop-shadow-lg 
        mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to NeuraX
      </motion.h1>

      <p className="text-xl mb-10 text-muted text-center">
        <Typewriter
          words={['Your AI Assistant', 'Your Document Brain', 'Your Automation Wizard']}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={1500}
        />
      </p>

      <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      gap-8 
      max-w-6xl
      w-full
      justify-items-center">
        {features.map(({ name, desc, image, href }) => (
          <Link href={href} key={name}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-surface 
              rounded-xl 
              p-6 flex 
              flex-col 
              items-center 
              text-center 
              transition-shadow 
              hover:shadow-[0_0_15px_#6c47ff] 
              cursor-pointer
              h-[200px] 
              mb-4
              bg-blend-overlay bg-black/60
            "
              style={{ perspective: '1000px',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: '4em'
               }}>
              <div className="flex-grow" />
              <div className="backdrop-blur-sm bg-transparent p-2 rounded-md w-full">
                  <h2 className="text-xl font-bold text-accent">{name}</h2>
                  <p className="text-sm text-muted mt-1">{desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>)}
    </>
  )
}
