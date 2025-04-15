import type { TAwardsTitleProps } from '@/props/pages/about/awards'
import type { Variants } from 'motion/react'

import { motion } from 'motion/react'

export function Title({ children }: TAwardsTitleProps) {
  const awardTitleVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1,
      },
    },
  }

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={awardTitleVariants}
      viewport={{ margin: '0% 0% -15% 0%' }}
      style={{ y: '100%', opacity: 0 }}
      className="mx-auto text-[clamp(1.5rem,_3vw,_2.75rem)] leading-[clamp(2rem,_1.8vw,_2.5rem)] text-black sm:mr-0"
    >
      {children}
    </motion.h2>
  )
}
