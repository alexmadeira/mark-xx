import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

export function ProjectDetailsDescription(props: TProjectDetailsContentProps) {
  return (
    <p className="group-data-[size='2x4']/masonry-item:5xl:block group-data-[size='2x2']/masonry-item:5xl:block group-data-[size='4x2']/masonry-item:4xl:block hidden w-full translate-y-5 text-[clamp(0.85rem,1vw,1.25rem)] leading-[clamp(1.45rem,1.5vw,2rem)] opacity-0 delay-150 duration-300 text-shadow-black text-shadow-md group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 group-data-[size='2x4']/masonry-item:hidden group-data-[size='4x2']/masonry-item:hidden group-data-[size='8x8']/masonry-item:block group-data-[size='4x4']/masonry-item:2xl:block">
      {props.description}
    </p>
  )
}
