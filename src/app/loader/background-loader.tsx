import type { LottieRefCurrentProps } from 'lottie-react'

import { useRef } from 'react'

import Lottie from 'lottie-react'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { loadingMotion } from '_CFG/motion/loading'

import { useLoader } from '_STR/useLoader'

export function BackgroundLoader() {
  const logoRef = useRef<LottieRefCurrentProps>(null)

  const status = useLoader((st) => st.data.status)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      initial="hidden"
      animate={status === 'loading' ? 'visible' : 'hidden'}
      className={twMerge(
        'pointer-events-none fixed right-4 bottom-4 z-10 flex h-35 w-35 rounded-lg border border-zinc-200/40 bg-white p-3 shadow',
      )}
    >
      <Lottie className="w-full" lottieRef={logoRef} animationData={loadingMotion} loop={true} autoPlay={true} />
    </motion.div>
  )
}
