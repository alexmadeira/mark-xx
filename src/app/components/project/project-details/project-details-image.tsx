import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function ProjectDetailsImage(props: TProjectDetailsContentProps) {
  return (
    <div className="h-full w-full overflow-clip">
      <img
        data-src={props.thumbnail}
        alt={props.bannerName}
        className={twMerge(
          'h-full min-h-full w-full min-w-full scale-[1.005] object-cover transition-all duration-[2s] group-hover/masonry-item:scale-120 group-hover/masonry-item:duration-[8s]',
          props.thumbnailClass,
        )}
      />
    </div>
  )
}
