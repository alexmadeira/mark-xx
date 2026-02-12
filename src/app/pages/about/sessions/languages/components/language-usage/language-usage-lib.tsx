import type { TLanguageUsageLibProps } from '@/props/pages/about/languages'

import _ from 'lodash'

import { LanguageUsageBar } from './language-usage-bar'

export function LanguageUsageLib(props: TLanguageUsageLibProps) {
  const percentage = (props.usage / props.totalUsage) * 100

  return (
    <>
      <p className="flex items-center pl-4 text-[clamp(1.1rem,1.15vw,1.25rem)] leading-[clamp(1.25rem,1.825vw,1.5rem)] font-normal text-zinc-600">
        <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-zinc-400/80" /> {props.name}
      </p>
      <div className="pl-4">
        <LanguageUsageBar size={percentage} className="bg-mark-300" />
      </div>
    </>
  )
}
