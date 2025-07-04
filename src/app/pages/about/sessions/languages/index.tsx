import type { Variants } from 'framer-motion'

import { useWindowSize } from 'react-use'

import { motion } from 'framer-motion'

import { LanguageBars } from './components/language-bars'
import { LanguageUsage } from './components/language-usage'
import { Title } from './components/title'

export function Languages() {
  const { width } = useWindowSize()

  const languagesVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  if (width < 950) return null

  return (
    <div className="bg-mark-200/70 w-full overflow-hidden">
      <div className="px-x-container mx-auto flex max-w-[2000px] flex-col gap-[clamp(0.5rem,_2vw,_2.5rem)] py-[clamp(4rem,_8vw,_7rem)]">
        <Title>Linguagens mais utilizadas nos últimos projetos</Title>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={languagesVariants}
          viewport={{ margin: '0% 0% -15% 0%' }}
          className="relative w-full flex-col items-center"
        >
          <LanguageBars />
          <LanguageUsage />
        </motion.div>
      </div>
    </div>
  )
}
