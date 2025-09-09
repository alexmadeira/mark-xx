import { useEffect, useRef } from 'react'

import { uiConfigHero } from '_CFG/ui/hero'
import { AnimatePresence, motion, usePresence } from 'motion/react'

import { overlapController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export function Banner() {
  const overlapLogo = overlapController()
  const [isPresent, safeToRemove] = usePresence()

  const heroRef = useRef<HTMLDivElement>(null)
  const content = useHero((st) => st.data.current)

  useEffect(() => {
    if (!content) return

    if (isPresent) overlapLogo.addElement(heroRef.current, content.color)
    if (!isPresent) overlapLogo.removeElement(heroRef.current)

    if (safeToRemove) safeToRemove()

    const theme = document.querySelector('meta[name="theme-color"]')
    const msTile = document.querySelector('meta[name="msapplication-TileColor"]')
    const msNavbutton = document.querySelector('meta[name="msapplication-navbutton-color"]')
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')

    theme?.setAttribute('content', content.color)
    msTile?.setAttribute('content', content.color)
    msNavbutton?.setAttribute('content', content.color)
    appleStatusBar?.setAttribute('content', content.color)
  }, [content, isPresent])

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
