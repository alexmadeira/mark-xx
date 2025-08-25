import type { TBrandsBrandProps } from '@/props/pages/about/brands'

import { twMerge } from 'tailwind-merge'

export function Brand({ logo, name, className, ...rest }: TBrandsBrandProps) {
  return (
    <div
      {...rest}
      className={twMerge(
        'group relative z-0 flex aspect-square w-40 p-[clamp(0.5rem,_1vw,_1rem)] transition-transform duration-250 hover:scale-110',
        className,
      )}
    >
      <img src={logo} alt={name} className="h-full w-full rounded-md object-contain" />
    </div>
  )
}
