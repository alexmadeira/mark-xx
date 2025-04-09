import type { TLanguagesTitleProps } from '@/props/pages/about/languages'
import type { Variants } from 'framer-motion'

import { motion } from 'framer-motion'

export function Title({ children }: TLanguagesTitleProps) {
  const languagesTitleVariants: Variants = {
    hidden: { x: '-50%', opacity: 0 },
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
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={languagesTitleVariants}
      viewport={{ margin: '0% 0% -15% 0%' }}
      style={{ x: '-100%', opacity: 0 }}
      className="text-black-900 relative mb-10 w-full px-10 text-center text-4xl"
    >
      {children}
    </motion.h2>
  )
}
