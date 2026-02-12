import { useFetcherAwards } from '_STR/useFetcherAwards'
import { useFetcherPages } from '_STR/useFetcherPages'

import { Award } from './components/award'

export function Awards() {
  const about = useFetcherPages((st) => st.data.about)
  const awards = useFetcherAwards((st) => st.data.list)

  return (
    <div className="w-full">
      <div className="md:px-x-container mx-auto flex max-w-500 flex-col gap-[clamp(0.5rem,1vw,2rem)] px-8">
        <h2 className="mx-auto w-full text-[clamp(1.5rem,2vw,3.5rem)] leading-[clamp(1.825rem,2vw,4rem)] font-normal">
          {about.awardsTitle}
        </h2>
        <div
          className="w-[clamp(18rem,70vw,55rem)] text-[clamp(1rem,1.25vw,1.5rem)] leading-[clamp(1.5rem,2vw,2rem)] font-light text-current/60"
          dangerouslySetInnerHTML={{ __html: about?.awardsSubtitle }}
        />

        <ul className="mt-[clamp(0.5rem,1vw,1rem)] flex h-full w-full flex-1 flex-wrap items-stretch gap-4 font-light">
          {awards.map((award) => (
            <Award key={award.id} {...award} />
          ))}
        </ul>
      </div>
    </div>
  )
}
