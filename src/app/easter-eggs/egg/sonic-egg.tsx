import { Portal } from '@radix-ui/react-portal'
import { AnimatePresence, motion } from 'motion/react'

import { useActivity } from '_STR/useActivity'

export function SonicEgg() {
  const toastyEgg = useActivity((state) => state.data.monitors.main)

  const sonicWaiting = toastyEgg?.status === 'idle'

  return (
    <AnimatePresence>
      {sonicWaiting && (
        <Portal className="pointer-events-none select-none">
          <motion.img
            key="toasty-egg"
            exit={{ left: '-100%', bottom: '0%', transition: { duration: 0.6 } }}
            initial={{ left: '-100%', bottom: '0%' }}
            animate={{ left: '0%', bottom: '0%', transition: { duration: 0.4 } }}
            className="fixed z-20 w-[clamp(10rem,15vw,25rem)]"
            data-src="https://res.cloudinary.com/dgoi1pk8i/image/upload/v1773699957/sonic_waiting_nvol2z.gif"
          />
        </Portal>
      )}
    </AnimatePresence>
  )
}
