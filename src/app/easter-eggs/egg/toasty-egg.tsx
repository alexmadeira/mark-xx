import { useEffect } from 'react'

import { Portal } from '@radix-ui/react-portal'
import { AnimatePresence, motion } from 'motion/react'

import { analytics } from '_SRV/builder/analytics'
import { interfaceEvent } from '_SRV/builder/event'
import { easterEggController } from '_SRV/controller'
import { timer } from '_SRV/utils'

import { useEasterEgg } from '_STR/useEasterEgg'

export function ToastyEgg() {
  const UTimer = timer()
  const BAnalytics = analytics()
  const CLEasterEgg = easterEggController()

  const toastyEgg = useEasterEgg((state) => state.data.eggs.toasty)
  const showToastyEgg = toastyEgg?.status === 'called'

  useEffect(() => {
    if (toastyEgg?.status !== 'called') return

    interfaceEvent.emit('INTERFACE:Action:toasty')

    BAnalytics.trackEvent('EASTER_EGG_FOUND:toasty')

    const toastyTime = UTimer.delay(() => CLEasterEgg.readEgg('toasty'), 1000)

    return () => toastyTime()
  }, [toastyEgg?.status])

  return (
    <AnimatePresence>
      {showToastyEgg && (
        <Portal className="pointer-events-none select-none">
          <motion.img
            key="toasty-egg"
            exit={{ right: '-100%', bottom: '-100%', transition: { duration: 0.6 } }}
            initial={{ right: '-100%', bottom: '-50%' }}
            animate={{ right: '0%', bottom: '0%', transition: { duration: 0.4 } }}
            className="fixed z-20 w-[clamp(10rem,15vw,25rem)]"
            data-src="https://res.cloudinary.com/dgoi1pk8i/image/upload/v1771353636/toasty_i9dhgc.png"
          />
        </Portal>
      )}
    </AnimatePresence>
  )
}
