import { useRef } from 'react'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

import { BlockFullImage } from './block-full-image'
import { BlockImageGrid } from './block-image-grid'
// import { Browser } from './browser'
// import { Masonry } from './masonry'

export function Blocks() {
  const slug = useRef<string | null>(null)

  const projectSlug = useRoute((st) => st.data.params.slug)
  if (projectSlug) slug.current = projectSlug

  const project = useFetcherProjects((st) => (slug.current ? st.data.pages[slug.current] : undefined))

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
