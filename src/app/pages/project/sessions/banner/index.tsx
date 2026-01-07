import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Banner() {
  const slug = useRef<string | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const projectSlug = useRoute((st) => st.data.params.slug)
  if (projectSlug) slug.current = projectSlug

  const project = useFetcherProjects((st) => (slug.current ? st.data.pages[slug.current] : undefined))
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={targetRef} className="fixed top-0 left-0 h-screen max-h-[200vw] min-h-100 w-full">
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

// <motion.video
//   style={{ opacity }}
//   className="h-full w-full object-cover lg:object-top"
//   loop
//   muted
//   autoPlay
//   playsInline
//   preload="metadata"
//   poster="https://garage.im/wp-content/uploads/2025/04/thumb_megabanner_home.jpg"
//   bv-data-src={project.banner}
//   src={project.banner}
// />
