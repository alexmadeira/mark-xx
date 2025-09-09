import type { TPageHeaderTitleProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

import { HeaderTitleName } from './header-title-name'

export function HeaderTitle({ className, children, ...props }: TPageHeaderTitleProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'my-4 w-full',
        'sm:mt-8 sm:mb-4',
        'md:mt-[clamp(1rem,4vw,5rem)] lg:mb-[clamp(1.5rem,5.5vw,10rem)]',
        className,
      )}
    >
      <div
        className={twMerge(
          'mx-auto flex w-full flex-col gap-0 px-8',
          'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
          'lg:px-x-container',
        )}
      >
        <HeaderTitleName />
        {children}
      </div>
    </div>
  )
}
