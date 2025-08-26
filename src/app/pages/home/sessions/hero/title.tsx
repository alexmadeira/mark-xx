import { memo } from 'react'

import { useFetcherPages } from '_STR/useFetcherPages'
import { useHero } from '_STR/useHero'

export const Title = memo(() => {
  const typing = useHero((st) => st.data.typing)
  const pageProperties = useFetcherPages((st) => st.data.home?.properties)

  return (
    <div
      style={{ opacity: typing ? 1 : 0 }}
      className="relative z-1 my-[clamp(1rem,4vw,5rem)] w-full flex-1 transition-opacity duration-2000"
    >
      <div className="px-x-container mx-auto flex w-full flex-1 flex-col gap-0">
        <h1 className="text-black-900 w-full text-[clamp(3rem,12vw,8rem)] leading-none tracking-widest">
          {pageProperties?.name}
        </h1>
        <h2 className="flex items-center text-[clamp(1.125rem,5vw,6rem)] leading-[clamp(1.75rem,5vw,1)] font-light text-nowrap transition-colors duration-200">
          Desenvolvedor {typing}
          <span className="animate-blink ml-1 inline-block h-[1em] w-[0.05em] bg-current align-text-bottom" />
        </h2>
      </div>
    </div>
  )
})
