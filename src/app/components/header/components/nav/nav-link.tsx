import type { TNavLinkProps } from '@/props/components/header/nav'

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

import { navigationColorController, overlapController } from '_SRV/controller'

import { useOverlap } from '_STR/useOverlap'

export function NavLink({ className, ...rest }: TNavLinkProps) {
  const overlapKey = `navigation:${rest.to.toString().slice(1)}`
  const CLOverlap = overlapController(overlapKey)
  const CLNavigationColor = navigationColorController()

  const navigationRef = useRef<HTMLAnchorElement>(null)
  const overlapNavigation = useOverlap((st) => st.data.collision[overlapKey])
  const over = useOverlap((st) => st.data.collision)

  console.log(over)
  useEffect(() => {
    CLOverlap.setTarget(navigationRef.current)
  }, [navigationRef.current])

  const bgColor = CLNavigationColor.betterContrast(overlapNavigation)
  const textColor = CLNavigationColor.betterContrast(bgColor)

  const style: Record<string, string> = {
    '--bg-color': bgColor,
    '--text-color': textColor,
    '--hover-bg-color': textColor,
    '--hover-text-color': bgColor,
  }

  return (
    <Link
      {...rest}
      ref={navigationRef}
      style={style}
      className={twMerge(
        'rounded-full bg-[var(--bg-color)] px-[clamp(1rem,2vw,1.75rem)] py-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2vw,1.125rem)] leading-[clamp(1.25rem,2vw,1.75rem)] text-[var(--text-color)] transition duration-200 hover:scale-110 hover:bg-[var(--hover-bg-color)] hover:text-[var(--hover-text-color)] hover:shadow-md active:scale-95 active:duration-100',
        className,
      )}
    />
  )
}
