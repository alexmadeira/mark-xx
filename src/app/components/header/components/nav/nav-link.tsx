import type { TNavLinkProps } from '@/props/components/header/nav'

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

import { colorController, overlapController } from '_SRV/controller'

import { useOverlap } from '_STR/useOverlap'

export function NavLink({ className, ...rest }: TNavLinkProps) {
  const name = `navigation:${rest['data-name']}`

  const CLOverlap = overlapController()
  const CLNavigationColor = colorController('navigation')

  const navigationRef = useRef<HTMLAnchorElement>(null)
  const overlapNavigation = useOverlap((st) => st.data.collision[name])

  useEffect(() => {
    CLOverlap.setTarget(name, navigationRef.current)
  }, [navigationRef.current])

  CLNavigationColor.betterContrast('navigation', overlapNavigation)

  return (
    <Link
      {...rest}
      ref={navigationRef}
      className={twMerge(
        'pointer-events-auto rounded-full border border-zinc-400/50 px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2vw,1.125rem)] leading-[clamp(1.25rem,2vw,1.75rem)] transition-transform duration-500 hover:scale-110 hover:shadow-lg active:scale-95 active:duration-250',
        'bg-(--navigation-foreground-color) text-(--navigation-contrast-foreground-color) shadow-(color:--navigation-foreground-shadow-color)',
        'hover:bg-(--navigation-contrast-foreground-color) hover:text-(--navigation-foreground-color)! hover:shadow-(color:--navigation-contrast-foreground-shadow-color)',
        className,
      )}
    />
  )
}
