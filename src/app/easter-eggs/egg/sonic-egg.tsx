import { Portal } from '@radix-ui/react-portal'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'
import { useEasterEgg } from '_STR/useEasterEgg'

export function SonicEgg() {
  const BAnalytics = analytics()

  const sonicEgg = useEasterEgg((state) => state.data.eggs.sonic)
  const isCalled = sonicEgg?.status === 'called'

  useEffect(() => {
    if (isCalled) BAnalytics.trackEvent('EASTER_EGG_FOUND:sonic')
  }, [isCalled])

  return (
    <AnimatePresence>
      {isCalled && (
        <Portal className="pointer-events-none select-none">
          <motion.img
            key="toasty-egg"
            initial={{ left: '-100%', bottom: '0%' }}
            className="fixed z-20 w-[clamp(10rem,15vw,25rem)]"
            exit={{ left: '-100%', bottom: '0%', transition: { duration: 0.6 } }}
            animate={{ left: '0%', bottom: '0%', transition: { duration: 0.4 } }}
            data-src="https://res.cloudinary.com/dgoi1pk8i/image/upload/v1773699957/sonic_waiting_nvol2z.gif"
          />
        </Portal>
      )}
    </AnimatePresence>
  )
}
