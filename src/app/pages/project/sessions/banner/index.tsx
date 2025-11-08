import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'

import { routeController } from '_SRV/controller'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export function Banner() {
  const CLRoute = routeController()

  const targetRef = useRef<HTMLDivElement>(null)

  const project = useFetcherProjects((st) => st.data.pages[CLRoute.params.slug]?.properties)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.3])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15])
  return (
    <div
      key="project-banner"
      ref={targetRef}
      className="fixed top-0 left-0 h-[100vh] max-h-[200vw] min-h-[400px] w-full"
    >
      <div className="relative h-full w-full overflow-hidden">
        <motion.img
          style={{ opacity, scale }}
          data-src={project?.bannerSrc}
          alt={project?.bannerName || ''}
          className="h-full w-full object-cover lg:object-top"
        />
      </div>
    </div>
  )
}
