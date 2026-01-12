import { useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Description() {
  const slug = useRef<string | null>(null)

  const projectSlug = useRoute((st) => st.data.params.slug)
  if (projectSlug) slug.current = projectSlug

  const project = useFetcherProjects((st) => (slug.current ? st.data.pages[slug.current] : undefined))

  if (project?.status !== 'loaded') return null
  return (
    <div
      className={twMerge(
        'flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)]',
        '[&_p]:text-[clamp(0.875rem,1vw,1.5rem)] [&_p]:leading-[calc(1.25/0.875),2vw,calc(2/1.5)] [&_p]:font-light',
        '[&_h2]:mt-[clamp(0.5rem,1.5vw,2rem)] [&_h2]:text-[clamp(1.25rem,1.85vw,3.25rem)] [&_h2]:leading-[calc(1.75/1.25),2vw,2.25] [&_h2]:font-medium [&_h2]:first:mt-0',
      )}
      dangerouslySetInnerHTML={{ __html: project.content }}
    />
  )
}
