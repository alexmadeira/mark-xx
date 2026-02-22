import { useEffect, useRef } from 'react'

import { Image } from '_APP/components/ui-element/image'
import _ from 'lodash'
import { motion, useScroll, useTransform } from 'motion/react'

import { scrollingController } from '_SRV/controller'
import { timer } from '_SRV/utils'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Banner() {
  const CLScrolling = scrollingController()
  const UTimer = timer()

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
    const cancelTimer = UTimer.delay(() => CLScrolling.scrollTo(window.innerHeight, 2.5), 250)
    return cancelTimer
  }, [pageIsReady])

  return (
    <div ref={targetRef} className="fixed top-0 left-0 h-screen max-h-[200vw] min-h-100 w-full">
      <div className="relative h-screen w-screen overflow-hidden">
        {!!project?.banner && (
          <motion.div
            style={{ opacity, scale }}
            className="absolute top-1/2 h-full w-full -translate-y-1/2 md:top-0 md:translate-y-0 lg:object-top"
          >
            <Image src={project.banner} alt={project.bannerName || ''} className="object-cover" />
          </motion.div>
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
