import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'

export function Banner() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.3])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div
      key="project-banner"
      ref={targetRef}
      className="fixed top-0 left-0 h-[100vh] max-h-[200vw] min-h-[400px] w-full"
    >
      <div className="relative h-full w-full overflow-hidden">
        <motion.img
          style={{ opacity, scale }}
          src="/img/temp/projects/mizuno-banner.png"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
