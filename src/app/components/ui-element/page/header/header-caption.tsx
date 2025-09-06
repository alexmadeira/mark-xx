import type { TPageHeaderCaptionProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

export function HeaderCaption({ className, ...props }: TPageHeaderCaptionProps) {
  return (
    <h2
      {...props}
      className={twMerge(
        'flex items-center text-[clamp(1.125rem,4vw,6rem)] leading-[120%] font-light text-nowrap transition-colors duration-200',
        '4xl:text-[clamp(7rem,5.5vw,9rem)] 4xl:leading-relaxed',
        className,
      )}
    />
  )
}
