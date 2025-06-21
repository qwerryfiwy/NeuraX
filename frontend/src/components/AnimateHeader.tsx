'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { name: 'assistant', label: ' Assistant' },
  { name: 'docs', label: ' Docs' },
]

export default function AnimatedHeader() {
  const pathname = usePathname()

  const isActive = (tab: string) => pathname === `/${tab}`

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex
    justify-center 
    items-center 
    gap-10 py-4 
    bg-[radial-gradient(circle_at_center,_#0f0f10,_#05050a,_#0d1a2b)] 
    shadow-md"
    >
      {tabs.map(({ name, label }) => (
        <motion.div
          key={name}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative"
        >
          <Link
            href={`/${name}`}
            className={`text-lg font-medium tracking-wide px-2 pb-1 transition-all duration-300
              ${
                isActive(name)
                  ? 'text-[#6c47ff]'
                  : 'text-[#bbbbbb] hover:text-[#00ffe7]'
              }`}
          >
            {label}
          </Link>

          {isActive(name) && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6c47ff] via-[#00ffe7] to-[#6c47ff] rounded-full shadow-[0_0_10px_#6c47ff]"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
    </motion.header>
  )
}
