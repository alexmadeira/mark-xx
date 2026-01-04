import { useWindowSize } from 'react-use'

import { LanguageBars } from './components/language-bars'
import { LanguageUsage } from './components/language-usage'

export function Languages() {
  const { width } = useWindowSize()

  if (width < 950) return null

  return (
    <div className="bg-mark-200/70 w-full overflow-hidden">
      <div className="md:px-x-container mx-auto flex max-w-500 flex-col gap-[clamp(0.5rem,2vw,2.5rem)] px-8 py-[clamp(4rem,8vw,7rem)]">
        <h2 className="relative mb-10 w-full px-10 text-center text-4xl text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          Linguagens mais utilizadas nos últimos projetos
        </h2>
        <div className="relative w-full flex-col items-center">
          <LanguageBars />
          <LanguageUsage />
        </div>
      </div>
    </div>
  )
}
