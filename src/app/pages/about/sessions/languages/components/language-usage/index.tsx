import type { TLanguageUsageProps } from '@/props/pages/about/languages'

import { useRef } from 'react'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { useFetcherRepositoryLanguages } from '_STR/useFetcherRepositoryLanguages'

import { LanguageUsageTooltip } from '../language-tooltip'

import { LanguageUsageBar } from './language-usage-bar'
import { LanguageUsageLib } from './language-usage-lib'

export function LanguageUsage({ className, ...props }: TLanguageUsageProps) {
  const languageRef = useRef<HTMLDivElement>(null)
  const totalUsage = useFetcherRepositoryLanguages((st) => st.data.totalUsage)
  const percentage = (props.usage / totalUsage) * 100

  return (
    <>
      <LanguageUsageTooltip {...props} language={languageRef.current} />
      <div
        ref={languageRef}
        className={twMerge(
          'grid w-full cursor-help grid-cols-[clamp(13rem,20vw,16rem)_1fr] gap-x-[clamp(1rem,1.75vw,2rem)] gap-y-1 transition duration-300 group-hover/language:opacity-50 group-hover/language:grayscale hover:opacity-100 hover:grayscale-0',
          className,
        )}
      >
        <p className="flex flex-1 items-center text-[clamp(1.25rem,2vw,1.5rem)] leading-[clamp(1.25rem,2vw,2rem)] font-medium">
          {props.name}
        </p>
        <div className="flex items-center">
          <LanguageUsageBar size={percentage} className="bg-mark-600" />
        </div>
        {_.map(props.libs, (lib) => (
          <LanguageUsageLib key={lib.name} {...lib} totalUsage={props.usage} />
        ))}
      </div>
    </>
  )
}
