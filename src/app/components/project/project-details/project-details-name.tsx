import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

import { twMerge } from 'tailwind-merge'

export function ProjectDetailsName(props: TProjectDetailsContentProps) {
  return (
    <h2
      className={twMerge(
        'translate-y-5 truncate text-2xl font-semibold opacity-0 delay-75 duration-300 text-shadow-black text-shadow-md group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100',
        "group-data-[size='2x2']/masonry-item:sm:text-xl group-data-[size='2x2']/masonry-item:md:text-[clamp(1rem,2vw,2.25rem)] group-data-[size='2x2']/masonry-item:md:leading-[clamp(1.5,2vw,1.25)]",
        "group-data-[size='4x4']/masonry-item:sm:text-2xl group-data-[size='4x4']/masonry-item:md:text-[clamp(1.25rem,2.25vw,3rem)] group-data-[size='4x4']/masonry-item:md:leading-[clamp(1.5,2.25vw,1.5)]",
        "group-data-[size='2x4']/masonry-item:sm:text-2xl group-data-[size='2x4']/masonry-item:md:text-[clamp(1rem,2vw,2.25rem)] group-data-[size='2x4']/masonry-item:md:leading-[clamp(1.5,2vw,1.5)]",
        "group-data-[size='4x2']/masonry-item:sm:text-2xl group-data-[size='4x2']/masonry-item:md:text-[clamp(1rem,2vw,2rem)] group-data-[size='4x2']/masonry-item:md:leading-[clamp(1.5,2vw,1.25)]",
      )}
    >
      {props.name}
    </h2>
  )
}
