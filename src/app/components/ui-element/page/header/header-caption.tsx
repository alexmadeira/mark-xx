import type { TPageHeaderCaptionProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

export function HeaderCaption({ className, ...props }: TPageHeaderCaptionProps) {
  return (
    <h2
      {...props}
      className={twMerge(
        'flex items-center text-xl font-light text-nowrap transition-colors duration-200 sm:text-2xl',
        'md:text-[clamp(1.125rem,4vw,6rem)] md:leading-[120%]',
        '4xl:text-[clamp(7rem,5.5vw,9rem)] 4xl:leading-relaxed',
        className,
      )}
    />
  )
}

// className={twMerge(
//   'text-black-900 w-full text-4xl tracking-widest sm:text-5xl',
//   'md:text-[clamp(2rem,9vw,8rem)]',
//   '4xl:text-[clamp(13rem,10vw,17rem)] leading-none',
// )}
