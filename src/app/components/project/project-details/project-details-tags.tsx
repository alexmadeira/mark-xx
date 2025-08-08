import type { TProjectDetailsContentProps } from '@/props/pages/projects/project-details'

export function ProjectDetailsTag(props: TProjectDetailsContentProps) {
  return (
    <p className="group-data-[size='2x2']/masonry-item:4xl:flex group-data-[size='2x4']/masonry-item:3xl:flex flex translate-y-5 flex-wrap gap-[clamp(0.5rem,0.5vw,1rem)] pb-1 text-[clamp(0.75rem,0.8vw,1.25rem)] leading-[clamp(1.333rem,1vw,1.555rem)] opacity-0 delay-100 duration-300 group-hover/masonry-item:translate-y-0 group-hover/masonry-item:opacity-100 group-data-[size='2x2']/masonry-item:sm:hidden group-data-[size='2x4']/masonry-item:sm:hidden">
      {props.tags.map((tag) => (
        <span
          key={tag.id}
          className="rounded-full bg-[var(--project-details-foreground-color)] px-4 py-0.5 backdrop-blur-sm"
        >
          {tag.name}
        </span>
      ))}
    </p>
  )
}
