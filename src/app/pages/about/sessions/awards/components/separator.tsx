import type { Variants } from 'motion/react'

import { motion } from 'motion/react'

export function Separator() {
  const awardSeparatorVariants: Variants = {
    hidden: { x: '-100%', opacity: 0 },
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
    <motion.span
      initial="hidden"
      whileInView="visible"
      variants={awardSeparatorVariants}
      viewport={{ margin: ' 0% 0% -10% 0%' }}
      style={{ x: '-100%', opacity: 0 }}
      className="h-[1px] w-full bg-black group-last:hidden"
    />
  )
}
