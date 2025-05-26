import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { LogoSVG } from '_APP/components/ui-element/logo-svg'
import { motion } from 'motion/react'

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
      <motion.div
        style={{
          opacity: 0,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          type: 'spring',
        }}
      >
        <LogoSVG
          color={CLLogoColor.betterContrast(overlapLogo)}
          className="w-[clamp(3.5rem,10vw,10rem)] transition-colors duration-250"
        />
      </motion.div>
    </Link>
  )
}
