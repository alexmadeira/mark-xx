import { useEffect, useRef } from 'react'

import { AnimatePresence, motion, usePresence } from 'motion/react'

import { uiConfigHero } from '_CFG/ui/hero'

import { overlapController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export function Banner() {
  const overlapLogo = overlapController()

  const [isPresent, safeToRemove] = usePresence()
  const heroRef = useRef<HTMLDivElement>(null)

  const content = useHero((st) => st.data.current)
  const background = useHero((st) => st.data.color)

  useEffect(() => {
    if (!content) return

    if (isPresent) overlapLogo.addElement(heroRef.current, content.color)
    if (!isPresent) overlapLogo.removeElement(heroRef.current)

    if (safeToRemove) safeToRemove()
  }, [content, isPresent])

  return (
    <motion.div
      ref={heroRef}
      style={{ background }}
      className="group absolute top-0 left-0 h-full w-full overflow-clip"
    >
      <AnimatePresence mode="sync">
        {content && (
          <motion.img
            key={content.id}
            alt={content.name}
            data-src={content.banner}
            {...uiConfigHero.banner}
            className="absolute top-0 left-0 h-full w-full object-cover object-top"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
