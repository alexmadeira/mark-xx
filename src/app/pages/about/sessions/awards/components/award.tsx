import type { Variants } from 'motion/react'

import { TAwardsAwardProps } from '@/props/pages/about/awards'

import { Medal } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { Separator } from './separator'

export function Award({ children, className, ...rest }: TAwardsAwardProps) {
  const awardVariants: Variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1,
      },
    },
  }
  return (
    <li className="group relative flex w-full flex-col">
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={awardVariants}
        viewport={{ margin: '0% 0% -15% 0%' }}
        style={{ x: '100%', opacity: 0 }}
        className="relative flex items-center gap-4 py-[clamp(1rem,2vw,2rem)] pr-4 text-[clamp(1rem,3vw,1.25rem)] leading-[clamp(1.5rem,3vw,1.75rem)] sm:ml-auto"
      >
        <Medal
          weight="fill"
          className="h-[clamp(1.75rem,_2.7vw,_2.5rem)] w-[clamp(1.75rem,_2.7vw,_2.5rem)] text-yellow-500"
        />
        <span {...rest} className={twMerge('flex-1', className)}>
          {children}
        </span>
      </motion.p>
      <Separator />
    </li>
  )
}
