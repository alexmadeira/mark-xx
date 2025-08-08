import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

export function ProjectDetailsName(props: TProjectDetailsContentProps) {
  return (
    <h2 className="group-data-[size='2x2']/masonry-item:4xl:block group-data-[size='2x4']/masonry-item:3xl:block 5xl:text-5xl translate-y-5 text-2xl font-semibold opacity-0 transition-all delay-75 duration-300 text-shadow-[color:var(--project-details-foreground-color)] text-shadow-md group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 sm:text-3xl group-data-[size='2x2']/masonry-item:sm:hidden group-data-[size='2x4']/masonry-item:sm:hidden md:text-4xl">
      {props.name}
    </h2>
  )
}
