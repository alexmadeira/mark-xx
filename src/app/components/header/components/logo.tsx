import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { LogoSVG } from '_APP/components/ui-element/logo-svg'

import { logoColorController, overlapController } from '_SRV/controller'

import { useOverlap } from '_STR/useOverlap'

export function Logo() {
  const CLOverlap = overlapController('logo')
  const CLLogoColor = logoColorController()

  const logoRef = useRef<HTMLAnchorElement>(null)
  const overlapLogo = useOverlap((st) => st.data.collision.logo)

  useEffect(() => {
    CLOverlap.setTarget(logoRef.current)
  }, [logoRef.current])

  return (
    <Link to="/" ref={logoRef}>
      <LogoSVG
        style={{ color: CLLogoColor.randomBetterContrast(overlapLogo, 4) }}
        className="w-[clamp(3.5rem,10vw,10rem)] transition-colors duration-250"
      />
    </Link>
  )
}
