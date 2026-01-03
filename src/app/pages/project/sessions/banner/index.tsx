import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { motion, useScroll, useTransform } from 'motion/react'

import { routeController } from '_SRV/controller'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export function Banner() {
  const location = useLocation()
  const CLRoute = routeController()

  const targetRef = useRef<HTMLDivElement>(null)

  const project = useFetcherProjects((st) => st.data.pages[CLRoute.params.slug])

  console.log('project banner render', project)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.3])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  return (
    <div
      key={`project-banner:${location.pathname}`}
      ref={targetRef}
      className="fixed top-0 left-0 h-screen max-h-[200vw] min-h-100 w-full"
    >
      <div className="relative h-full w-full overflow-hidden">
        {!!project?.banner && (
          <motion.img
            style={{ opacity, scale }}
            data-src={project.banner}
            alt={project.bannerName || ''}
            className="h-full w-full object-cover lg:object-top"
          />
        )}
      </div>
    </div>
  )
}
