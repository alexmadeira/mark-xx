import type { TNavLinkProps } from '@/props/components/header/nav'

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

import { navigationColorController, overlapController } from '_SRV/controller'

import { useOverlap } from '_STR/useOverlap'

export function NavLink({ className, ...rest }: TNavLinkProps) {
  const name = `navigation:${rest['data-name']}`

  const CLOverlap = overlapController()
  const CLNavigationColor = navigationColorController()

  const navigationRef = useRef<HTMLAnchorElement>(null)
  const overlapNavigation = useOverlap((st) => st.data.collision[name])

  useEffect(() => {
    CLOverlap.setTarget(name, navigationRef.current)
  }, [navigationRef.current])

  const background = CLNavigationColor.betterContrast(overlapNavigation, 'navigation-background')
  const text = CLNavigationColor.betterContrast(background.color, 'navigation-text')

  return (
    <Link
      {...rest}
      ref={navigationRef}
      style={{ ...background, ...text }}
      className={twMerge(
        'rounded-full border border-zinc-400/50 bg-[var(--navigation-background-color)] px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2vw,1.125rem)] leading-[clamp(1.25rem,2vw,1.75rem)] text-[var(--navigation-text-color)]! transition duration-300 hover:scale-110 hover:bg-[var(--navigation-background-foreground-color)] hover:text-[var(--navigation-text-foreground-color)]! hover:shadow-lg hover:shadow-[color:var(--navigation-background-foreground-shadow-color)] active:scale-95 active:duration-100',
        className,
      )}
    />
  )
}
