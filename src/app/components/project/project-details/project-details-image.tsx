import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

import { Image } from '_APP/components/ui-element/image'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function ProjectDetailsImage(props: TProjectDetailsContentProps) {
  return (
    <div className={twMerge('relative h-full w-full overflow-clip', props.thumbnailClass)}>
      <Image src={props.thumbnail} alt={props.bannerName} className="object-cover" />
    </div>
  )
}
