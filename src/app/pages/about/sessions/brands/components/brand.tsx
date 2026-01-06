import type { TBrandsBrandProps } from '@/props/pages/about/brands'

import { twMerge } from 'tailwind-merge'

export function Brand({ logo, name, className, ...rest }: TBrandsBrandProps) {
  return (
    <div
      {...rest}
      className={twMerge(
        'group relative z-0 flex aspect-square w-40 p-[clamp(0.5rem,1vw,1rem)] grayscale transition-all duration-250 hover:scale-110 hover:grayscale-0',
        className,
      )}
    >
      <img data-src={logo} alt={name} className="h-full w-full rounded-md object-contain" />
    </div>
  )
}
