import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

import { twMerge } from 'tailwind-merge'

import { Image } from '_APP/components/ui-element/image'

export function ProjectDetailsImage(props: TProjectDetailsContentProps) {
  return (
    <div
      className={twMerge(
        'h-full min-h-full w-full min-w-full object-cover transition-all duration-[20s] group-hover/masonry-item:scale-105 group-hover/masonry-item:duration-[8s]',
        props.thumbnailClass,
      )}
    >
      <Image src={props.thumbnail} alt={props.bannerName} className="object-cover" />
    </div>
  )
}
