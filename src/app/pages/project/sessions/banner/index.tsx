import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import { motion, useScroll, useTransform } from 'motion/react'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export function Banner() {
  const { slug } = useParams()
  if (!slug) throw new Error('Project slug is required')

  const targetRef = useRef<HTMLDivElement>(null)
  const project = useFetcherProjects((st) => st.data.pages[slug]?.properties)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.3])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15])

  console.log(project?.bannerSrc)
  return (
    <div
      key="project-banner"
      ref={targetRef}
      className="fixed top-0 left-0 h-[100vh] max-h-[200vw] min-h-[400px] w-full"
    >
      <div className="relative h-full w-full overflow-hidden">
        <motion.img
          style={{ opacity, scale }}
          src={project?.bannerSrc}
          alt={project?.bannerName || ''}
          className="h-full w-full object-cover lg:object-top"
        />
      </div>
    </div>
  )
}
