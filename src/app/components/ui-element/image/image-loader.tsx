import type { TPageImageLoaderProps } from '@/props/components/ui-element/page/image'
import type { LottieRefCurrentProps } from 'lottie-react'

import { useRef } from 'react'

import Lottie from 'lottie-react'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { loadingMotion } from '_CFG/motion/loading'

export function ImageLoader({ className }: TPageImageLoaderProps) {
  const logoRef = useRef<LottieRefCurrentProps>(null)

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={twMerge('absolute inset-0 z-10 flex items-center justify-center', className)}
    >
      <Lottie
        loop
        autoPlay
        className="aspect-square max-h-[70%] max-w-[70%]"
        lottieRef={logoRef}
        animationData={loadingMotion}
      />
    </motion.div>
  )
}
