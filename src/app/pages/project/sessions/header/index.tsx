import { useEffect, useRef } from 'react'

import { Image } from '_APP/components/ui-element/image'
import { Building2, CalendarDays } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

import { overlapController } from '_SRV/controller'
import { dayJS } from '_SRV/lib'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Header() {
  const slug = useRef<string | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLHeadingElement>(null)

  const CLOverlap = overlapController()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const projectSlug = useRoute((st) => st.data.params.slug)
  if (projectSlug) slug.current = projectSlug

  const project = useFetcherProjects((st) => (slug.current ? st.data.pages[slug.current] : undefined))
  const x = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-50%', '-50%', '0%'])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-50%', '-50%', '0%'])
  const top = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-60lvh', '-40lvh', '0lvh'])
  const left = useTransform(scrollYProgress, [0, 0.2, 0.5], ['50%', '50%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5], [2, 1.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  const bornYear = dayJS(project?.date).format('YYYY')

  useEffect(() => {
    if (logoRef.current) CLOverlap.addElement(logoRef.current, project?.logoColor || '--page-foreground-color')
  }, [logoRef.current])

  return (
    <div
      ref={targetRef}
      className="md:px-x-container relative mt-[110lvh] flex w-full flex-col gap-[clamp(0.5rem,1vw,2rem)] px-8"
    >
      <motion.h1 ref={logoRef} style={{ scale, top, x, y, left, opacity }} className="relative w-fit text-nowrap">
        {project?.logo && (
          <div className="h-[clamp(4rem,10vw,25rem)] max-w-[clamp(12rem,35vw,60rem)]">
            <Image src={project?.logo} alt={project?.name} className="object-contain" />
          </div>
        )}

        {!project?.logo && project?.name}
      </motion.h1>
      <p className="flex flex-wrap gap-[clamp(1rem,1.25vw,1.85rem)] text-[clamp(0.8rem,1vw,1.5rem)] leading-[clamp(1.333rem,1vw,1.555rem)]">
        <span className="flex items-center justify-center gap-2">
          <CalendarDays className="w-[clamp(1rem,1.5vw,2rem)]" /> {bornYear}
        </span>
        {project?.company && (
          <span className="flex items-center justify-center gap-2">
            <Building2 className="w-[clamp(1rem,1.3vw,2rem)]" /> {project.company.name}
          </span>
        )}
      </p>
    </div>
  )
}
