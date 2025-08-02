import { useEffect, useRef } from 'react'

import _ from 'lodash'
import { AnimatePresence, motion } from 'motion/react'

import { heroController, overlapController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export function Banner() {
  const CLHero = heroController()
  const overlapLogo = overlapController()

  const heroRef = useRef<HTMLDivElement>(null)
  const content = useHero((st) => st.data.current.content)
  const isLoaded = useHero((st) => st.data.status.loaded)

  useEffect(() => {
    overlapLogo.addElement(heroRef.current, content.color)
  }, [content.color])

  return (
    <div ref={heroRef} className="group absolute top-0 left-0 h-full w-full overflow-clip">
      <AnimatePresence mode="sync" initial={false}>
        {isLoaded && (
          <motion.img
            key={content.id}
            alt={content.name}
            src={content.banner}
            className="absolute top-0 left-0 h-full w-full object-cover object-top"
            {...CLHero.settings.banner}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={content.color}
          {...CLHero.settings.bannerOverlay}
          style={{ background: content.color }}
          className="absolute top-0 left-0 h-full w-full"
        />
      </AnimatePresence>
    </div>
  )
}
