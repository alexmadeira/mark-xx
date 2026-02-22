import type { TProjectDetailsProps } from '@/props/pages/projects/project-details'

import { ZProjectDetailsProps } from '@/props/pages/projects/project-details'

import { useEffect, useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { overlapController } from '_SRV/controller'

import { ProjectDetailsDescription } from './project-details-description'
import { ProjectDetailsImage } from './project-details-image'
import { ProjectDetailsName } from './project-details-name'
import { ProjectDetailsTag } from './project-details-tags'

export function ProjectDetails(data: Partial<TProjectDetailsProps>) {
  const props = ZProjectDetailsProps.parse(data)
  const detailsRef = useRef<HTMLDivElement>(null)
  const CLOverlap = overlapController()

  useEffect(() => {
    CLOverlap.addElement(detailsRef.current, props.thumbnailColor)
  }, [detailsRef.current, props])

  return (
    <div
      ref={detailsRef}
      style={{ '--thumbnail-background': props.thumbnailColor }}
      className={twMerge(
        'relative flex h-full w-full flex-1 items-center justify-center overflow-hidden bg-(--thumbnail-background)',
        props.className,
      )}
    >
      <ProjectDetailsImage {...props} />
      <div className="absolute bottom-0 left-0 z-1 flex w-full flex-col gap-[clamp(0.5rem,0.75vw,1.25rem)] bg-black/20 px-[clamp(1rem,1.5vw,2.5rem)] py-[clamp(0.7rem,1.5vw,2.5rem)] text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/masonry-item:opacity-100">
        <ProjectDetailsName {...props} />
        <ProjectDetailsTag {...props} />
        <ProjectDetailsDescription {...props} />
      </div>
    </div>
  )
}
