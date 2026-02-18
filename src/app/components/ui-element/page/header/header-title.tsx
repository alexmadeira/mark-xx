import type { TPageHeaderTitleProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

import { HeaderTitleName } from './header-title-name'

export function HeaderTitle({ className, children, ...props }: TPageHeaderTitleProps) {
  return (
    <div {...props} className={twMerge('mb-[clamp(3rem,6vw,10rem)] w-full', className)}>
      <div
        className={twMerge(
          'mx-auto flex w-full flex-col gap-0 px-8',
          'md:px-[max(calc(var(--spacing-safe-area-x)+1rem),2rem)]',
          'lg:px-x-container',
        )}
      >
        <HeaderTitleName />
        {children}
      </div>
    </div>
  )
}
