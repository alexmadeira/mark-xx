import type { TAwardsAwardProps } from '@/props/pages/about/awards'

import { twMerge } from 'tailwind-merge'

import { AwardIcon } from './award-icon'

export function Award(porps: TAwardsAwardProps) {
  return (
    <li className="group flex w-full min-w-72 flex-1 flex-col overflow-clip rounded-lg border border-zinc-400/20 px-[clamp(1rem,1vw,1.5rem)] py-[clamp(1.5rem,1.5vw,2rem)] shadow-lg">
      <h3 className="flex items-center gap-4 px-4 pb-[clamp(0.25rem,1vw,1rem)] text-[clamp(1.25rem,2vw,1.5rem)] leading-[clamp(1.25rem,2vw,2rem)]">
        <AwardIcon type={porps.type.value} className="h-[clamp(1.6rem,2vw,2rem)] w-[clamp(1.6rem,2vw,2rem)]" />
        <span className={twMerge('flex-1 font-medium')}>{porps.name}</span>
      </h3>
      <p className="px-4 text-[clamp(1.1rem,1.15vw,1.25rem)] leading-[clamp(1.25rem,1.825vw,1.5rem)] text-zinc-700">
        {porps.description}
      </p>
      <p className="mt-auto px-4 pt-[clamp(0.875rem,1.25vw,1.5rem)] text-[clamp(1rem,1.15vw,1.25rem)] leading-[clamp(1.25rem,1.15vw,1.75rem)] font-medium text-zinc-500/80">
        {porps.by}
      </p>
    </li>
  )
}
