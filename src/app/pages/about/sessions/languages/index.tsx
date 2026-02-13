import { useWindowSize } from 'react-use'

import _ from 'lodash'

import { useFetcherPages } from '_STR/useFetcherPages'
import { useFetcherRepositoryLanguages } from '_STR/useFetcherRepositoryLanguages'

import { LanguageUsage } from './components/language-usage'

export function Languages() {
  const { width } = useWindowSize()
  const about = useFetcherPages((st) => st.data.about)
  const languageUsages = useFetcherRepositoryLanguages((st) => st.data.languageUsage)

  if (width < 950) return null

  return (
    <div className="bg-mark-50/50 py-session w-full">
      <div className="md:px-x-container mx-auto flex max-w-500 flex-col gap-[clamp(0.5rem,1vw,2rem)] px-8">
        <h2 className="relative w-full text-4xl text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          {about.languagesTitle}
        </h2>
        <div
          className="text-[clamp(1rem,1.25vw,1.5rem)] leading-[clamp(1.5rem,2vw,2rem)] font-light text-current/60"
          dangerouslySetInnerHTML={{ __html: about?.languagesSubtitle }}
        />
        <div className="group/language mt-[clamp(1rem,1.25vw,1.75rem)] flex w-full flex-col items-center gap-6">
          {_.map(languageUsages, (language) => (
            <LanguageUsage key={language.id} {...language} />
          ))}
        </div>
      </div>
    </div>
  )
}
