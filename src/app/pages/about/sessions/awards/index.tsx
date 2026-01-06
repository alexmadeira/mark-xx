import { useFetcherAwards } from '_STR/useFetcherAwards'

import { Award } from './components/award'

export function Awards() {
  const awards = useFetcherAwards((st) => st.data.list)

  return (
    <div className="w-full">
      <div className="md:px-x-container mx-auto flex max-w-500 flex-col gap-[clamp(0.5rem,2vw,2.5rem)] px-8">
        <h2 className="mx-auto w-full text-center text-[clamp(1.5rem,3vw,2.75rem)] leading-[clamp(2rem,1.8vw,2.5rem)] text-black">
          Prêmios/ Reconhecimento
        </h2>
        <ul className="flex flex-col font-light">
          {awards.map((award) => (
            <Award key={award.id}>
              <strong>{award.name}:</strong> {award.description}
            </Award>
          ))}
        </ul>
      </div>
    </div>
  )
}
