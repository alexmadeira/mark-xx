import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

import { BlockFullImage } from './block-full-image'
import { BlockImageGrid } from './block-image-grid'

export function Blocks() {
  const projectSlug = useRoute((st) => st.data.params.slug)

  const project = useFetcherProjects((st) => (projectSlug ? st.data.pages[projectSlug] : undefined))

  if (!project?.content) return null

  return (
    <div className="mt-[clamp(2.5rem,3vw,8rem)] flex flex-col gap-[clamp(1.5rem,3vw,8rem)]">
      {Object.entries(project.contents).map(([key, block]) => {
        if (block.type === 'full_image') return <BlockFullImage key={key} {...block} />
        if (block.type === 'image_grid') return <BlockImageGrid key={key} {...block} />
        return null
      })}
      {/* <Browser />
      <Grid />
      <Masonry /> */}
    </div>
  )
}
