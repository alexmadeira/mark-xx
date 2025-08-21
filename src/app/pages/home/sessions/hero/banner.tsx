import { useEffect, useRef } from 'react'

import { uiConfigHero } from '_CFG/ui/hero'
import { AnimatePresence, motion } from 'motion/react'

import { overlapController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export function Banner() {
  const overlapLogo = overlapController()

  const heroRef = useRef<HTMLDivElement>(null)
  const content = useHero((st) => st.data.current)

  useEffect(() => {
    if (!content) return
    overlapLogo.addElement(heroRef.current, content.color)
  }, [content?.color])

  return (
    <div ref={heroRef} className="group absolute top-0 left-0 h-full w-full overflow-clip">
      <AnimatePresence mode="sync">
        {content && (
          <motion.img
            key={content.id}
            alt={content.name}
            src={content.banner}
            {...uiConfigHero.banner}
            className="absolute top-0 left-0 h-full w-full object-cover object-top"
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="sync" initial={false}>
        {content && (
          <motion.div
            key={content.color}
            style={{ background: content.color }}
            {...uiConfigHero.bannerOverlay}
            className="absolute top-0 left-0 h-full w-full"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
