import { useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { heroController, overlapController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export function Banner() {
  const CLHero = heroController()
  const overlapLogo = overlapController()

  const heroRef = useRef<HTMLDivElement>(null)
  const current = useHero((st) => st.data.current)

  useEffect(() => {
    overlapLogo.addElement(heroRef.current, current.color).update()
  }, [heroRef.current, current.color])

  return (
    <div ref={heroRef} className="group absolute top-0 left-0 h-full w-full overflow-clip">
      <AnimatePresence mode="sync">
        <motion.img
          key={current.id}
          alt={current.name}
          src={current.banner}
          className="absolute top-0 left-0 h-full w-full object-cover object-top"
          {...CLHero.settings.banner}
        />
      </AnimatePresence>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.color}
          {...CLHero.settings.bannerOverlay}
          style={{ background: current.color }}
          className="absolute top-0 left-0 h-full w-full"
        />
      </AnimatePresence>
    </div>
  )
}
