import type { SVGProps } from 'react'

import { useEffect } from 'react'

import { motion, useAnimate } from 'motion/react'

export function LogoSVG(props: SVGProps<SVGSVGElement> & { color: string }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const controls = animate(scope.current, { fill: props.color })
    controls.speed = 0.2
    return () => controls.stop()
  }, [props.color])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 196" {...props}>
      <g id="alex-madeira_logo" data-name="Alex Madeira - Logo">
        <motion.path
          ref={scope}
          fill="#000000"
          d="M20 0C8.95 0 0 8.95 0 20v176h32v-71h23v71h32V0H20zm12 95V30h23v65H32zM232 0h-34c-7.19 0-13.48 3.81-17 9.5-3.52-5.7-9.81-9.5-17-9.5h-54v196h32V30h23v166h32V30h23v166h32V20c0-11.05-8.95-20-20-20z"
        />
      </g>
    </svg>
  )
}
