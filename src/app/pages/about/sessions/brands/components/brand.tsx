import type { TBrandsBrandProps } from '@/props/pages/about/brands'

import { twMerge } from 'tailwind-merge'

export function Brand({ logo, name, className, index, ...rest }: TBrandsBrandProps & { index: number }) {
  return (
    <div
      {...rest}
      data-xs={index < 3}
      data-sm={index <= 3}
      data-md={index <= 5}
      data-lg={index <= 7}
      data-xl={index <= 12}
      className={twMerge(
        'relative z-0 flex-1 p-[clamp(0.5rem,1vw,1rem)] grayscale transition-all duration-250 hover:z-1 hover:scale-110 hover:grayscale-0',
        'hidden data-[xs=true]:flex sm:data-[sm=true]:flex md:data-[md=true]:flex lg:data-[lg=true]:flex xl:data-[xl=true]:flex 2xl:flex',
        className,
      )}
    >
      <img data-src={logo} alt={name} className="h-full w-full rounded-md object-contain" />
    </div>
  )
}
