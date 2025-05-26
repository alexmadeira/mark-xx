import { useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { overlapController } from '_SRV/controller'

import { useHeroBanner } from '_STR/useHeroBanner'

export function Banner() {
  const current = useHeroBanner((st) => st.data.current)

  const heroRef = useRef<HTMLDivElement>(null)
  const overlapLogo = overlapController()

  useEffect(() => {
    overlapLogo.addElement(heroRef.current, current.color).update()
  }, [heroRef.current, current.color])

  return (
    <div ref={heroRef} className="group absolute top-0 left-0 h-full w-full">
      <AnimatePresence>
        <motion.img
          alt={current.name}
          key={current.id}
          src={current.banner}
          className="absolute top-0 left-0 h-full w-full object-cover object-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
          }}
        />
      </AnimatePresence>
      <div
        style={{ background: current.color }}
        className="absolute top-0 left-0 h-full w-full opacity-75 transition duration-500"
      />
    </div>
  )
}
