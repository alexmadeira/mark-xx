import { memo } from 'react'

import { heroColorController } from '_SRV/controller'

import { useHero } from '_STR/useHero'

export const Title = memo(() => {
  const CLHeroColor = heroColorController()
  const current = useHero((st) => st.data.current)

  return (
    <div
      style={{ ...CLHeroColor.betterContrast(current.color) }}
      className="relative z-1 mt-[clamp(1rem,4vw,5rem)] w-full flex-1"
    >
      <div className="px-x-container mx-auto flex w-full flex-1 flex-col gap-0">
        <h1 className="text-[clamp(2.25rem,7vw,12rem)] leading-[clamp(2.5rem,7vw,8rem)] tracking-wider transition-colors duration-200">
          Alex Madeira
        </h1>
        <h2 className="flex items-center text-[clamp(1.125rem,5vw,6rem)] leading-[clamp(1.75rem,5vw,1)] font-light text-nowrap transition-colors duration-200">
          Desenvolvedor {current.content}
          <span className="animate-blink ml-1 inline-block h-[1em] w-[0.05em] bg-current align-text-bottom" />
        </h2>
      </div>
    </div>
  )
})
