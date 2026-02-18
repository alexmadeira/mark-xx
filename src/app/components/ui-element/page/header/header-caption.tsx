import type { TPageHeaderCaptionProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

export function HeaderCaption({ className, ...props }: TPageHeaderCaptionProps) {
  return (
    <h2
      {...props}
      className={twMerge(
        'flex items-center text-xl leading-none font-light text-nowrap sm:text-2xl',
        'md:text-[clamp(1.125rem,4vw,6rem)]',
        '4xl:text-[clamp(7rem,5.5vw,9rem)]',
        className,
      )}
    />
  )
}
