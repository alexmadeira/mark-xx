import type { TNavLinkProps } from '@/props/components/header/nav'

import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

export function NavLink({ className, ...rest }: TNavLinkProps) {
  return (
    <Link
      {...rest}
      className={twMerge(
        'rounded-full bg-white px-[clamp(1rem,_2vw,_1.75rem)] py-[clamp(0.25rem,_1vw,_0.5rem)] text-[clamp(0.875rem,_2vw,_1.125rem)] leading-[clamp(1.25rem,_2vw,_1.75rem)] text-black transition duration-200 hover:scale-110 hover:bg-black hover:text-white hover:shadow-md active:scale-95 active:duration-100',
        className,
      )}
    />
  )
}
