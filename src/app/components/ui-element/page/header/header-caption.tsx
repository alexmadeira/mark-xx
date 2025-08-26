import type { TPageHeaderCaptionProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

export function HeaderCaption({ className, ...props }: TPageHeaderCaptionProps) {
  return (
    <h2
      {...props}
      className={twMerge(
        'flex items-center text-[clamp(1.125rem,5vw,6rem)] leading-[clamp(1.75rem,5vw,1)] font-light text-nowrap transition-colors duration-200',
        className,
      )}
    />
  )
}
