import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMeasure } from 'react-use'

import { overlapController } from '_SRV/controller'

import { useElement } from '_STR/useElement'
import { useOverlap } from '_STR/useOverlap'

import { Logo } from '../ui-element/logo'

import { Nav } from './nav'

export function Header() {
  const OverlapController = overlapController('logo')

  const [headerRef, props] = useMeasure<HTMLDivElement>()

  const logoRef = useRef<HTMLAnchorElement>(null)
  const overlapLogo = useOverlap((st) => st.data.collision.logo)

  useEffect(() => {
    OverlapController.setTarget(logoRef.current)
  }, [logoRef.current])

  useEffect(() => {
    useElement.getState().actions.setBlock('header', props)
  }, [props])

  return (
    <div ref={headerRef} className="fixed top-0 left-0 z-10 w-full">
      <div className="w-full pt-10">
        <div className="px-x-container mx-auto flex w-full flex-row items-center gap-[clamp(0.5rem,2vw,2.5rem)]">
          <Link to="/" ref={logoRef}>
            <Logo
              style={{ color: overlapLogo }}
              className="w-[clamp(3rem,_8vw,_5rem)] transition-colors duration-250"
            />
          </Link>
          <Nav />
        </div>
      </div>
    </div>
  )
}
