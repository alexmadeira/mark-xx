import { memo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { LogoSVG } from '_APP/components/ui-element/svg/logo'

import { colorController, overlapController } from '_SRV/controller'

import { useOverlap } from '_STR/useOverlap'

export const Logo = memo(() => {
  const CLOverlap = overlapController()
  const CLLogoColor = colorController('logo')

  const logoRef = useRef<HTMLAnchorElement>(null)
  const overlapLogo = useOverlap((st) => st.data.collision.logo)

  useEffect(() => {
    CLOverlap.setTarget('logo', logoRef.current)
  }, [])

  return (
    <Link to="/" ref={logoRef} className="pointer-events-auto">
      <div>
        <LogoSVG
          style={{ ...CLLogoColor.betterContrast(overlapLogo) }}
          className="w-[clamp(3.5rem,6vw,9rem)] transition-colors duration-250"
        />
      </div>
    </Link>
  )
})
