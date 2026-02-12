import type { TLanguageUsageBarProps } from '@/props/pages/about/languages'

import _ from 'lodash'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { twMerge } from 'tailwind-merge'

export function LanguageUsageBar({ size, className, ...rest }: TLanguageUsageBarProps) {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  })

  const width = useSpring(useTransform(scrollYProgress, [0.55, 0.78], ['0%', `${_.roundMin(size, 2.5)}%`]), {
    stiffness: 200,
    damping: 23,
    mass: 1.2,
  })

  return (
    <div className="relative h-4 w-full rounded-full bg-zinc-300/40">
      <motion.div
        {...rest}
        style={{ width }}
        className={twMerge('bg-mark-600 h-full rounded-full border border-zinc-200/40 shadow', className)}
      />
    </div>
  )
}
