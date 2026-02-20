import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { Description } from './description'
import { Email } from './email'
import { SocialNetworks } from './social-networks'

export function Content() {
  return (
    <div className={twMerge('relative z-1 mt-auto w-full pb-[clamp(1.75rem,5vw,5rem)]')}>
      <div
        className={twMerge(
          'flex h-full w-full flex-1 flex-col items-start justify-between gap-4 px-8 text-(--hero-contrast-color)',
          'sm:flex-row sm:items-end',
          'md:px-[max(calc(var(--spacing-safe-area-x)+1rem),2rem)',
          'lg:px-x-container',
        )}
      >
        <Description />
        <div className="relative z-1 flex flex-1 flex-col items-start gap-2 sm:items-end">
          <Email />
          <SocialNetworks />
        </div>
      </div>
    </div>
  )
}
