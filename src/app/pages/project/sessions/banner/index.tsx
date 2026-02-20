import { useEffect, useRef } from 'react'

import _ from 'lodash'
import { motion, useScroll, useTransform } from 'motion/react'

import { scrollingController } from '_SRV/controller'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Banner() {
  const CLScrolling = scrollingController()

  const slug = useRef<string | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const projectSlug = useRoute((st) => st.data.params.slug)
  const pageIsReady = useRoute((st) => st.data.pageReady)

  if (projectSlug) slug.current = projectSlug

  const project = useFetcherProjects((st) => (slug.current ? st.data.pages[slug.current] : undefined))

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    if (!pageIsReady) return
    const timeout = setTimeout(() => CLScrolling.scrollTo(window.innerHeight, 2.5), 250)
    return () => clearTimeout(timeout)
  }, [pageIsReady])

  return (
    <div ref={targetRef} className="fixed top-0 left-0 h-screen max-h-[200vw] min-h-100 w-full">
      <div className="relative h-screen w-screen overflow-hidden">
        {!!project?.banner && (
          <motion.img
            style={{ opacity, scale }}
            data-src={project.banner}
            alt={project.bannerName || ''}
            className="absolute top-1/2 h-full w-full -translate-y-1/2 object-cover md:top-0 md:translate-y-0 lg:object-top"
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
