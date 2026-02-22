import { useEffect, useRef } from 'react'

import { Image } from '_APP/components/ui-element/image'
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
        {content?.banner && (
          <motion.div
            {...uiConfigHero.banner}
            key={content.id}
            className="absolute top-1/2 h-full w-full -translate-y-1/2 md:top-0 md:translate-y-0 lg:object-top"
          >
            <Image src={content.banner} alt={content.name} className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
