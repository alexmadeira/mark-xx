import type { TLanguageTooltipUsageLibProps } from '@/props/pages/about/languages'

import _ from 'lodash'

export function LanguageTooltipLibUsage(props: TLanguageTooltipUsageLibProps) {
  const percentage = _.round((props.usage / props.totalUsage) * 100)

  return (
    <>
      <span className="text-[clamp(1rem,1.15vw,1.25rem)] leading-[clamp(1.25rem,1.825vw,1.5rem)] font-normal text-zinc-500">
        {props.name}
      </span>
      <div className="relative my-auto h-3 w-full min-w-[clamp(7rem,15vw,15rem)] flex-1 rounded-full bg-zinc-300/40">
        <div
          style={{ width: `${_.roundMin(percentage, 5)}%` }}
          className="bg-mark-300 h-full rounded-full border border-zinc-200/40 shadow"
        />
      </div>
      <span className="text-[clamp(0.5rem,1.15vw,1.1rem)] leading-[clamp(1.25rem,1.825vw,1.5rem)] font-light text-zinc-400">
        {percentage}%
      </span>
    </>
  )
}
