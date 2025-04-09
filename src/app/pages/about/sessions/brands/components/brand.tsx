import type { TBrandsBrandProps } from '@/props/pages/about/brands'
import type { Variants } from 'framer-motion'

import { motion } from 'framer-motion'

export function Brand({ index }: TBrandsBrandProps) {
  const brandVariants: Variants = {
    hidden: {
      y: -90,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 1,
        duration: 2,
        damping: 14,
        stiffness: 150,
        delay: 0.07 * index + 0.8,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={brandVariants}
      viewport={{ margin: '0% 0% -15% 0%' }}
      className="group relative z-0 flex aspect-square w-40 p-[clamp(0.5rem,_1vw,_1rem)]"
    >
      <img src="img/temp/mizuno.png" alt="" className="h-full w-full rounded-md object-contain" />
    </motion.div>
  )
}
