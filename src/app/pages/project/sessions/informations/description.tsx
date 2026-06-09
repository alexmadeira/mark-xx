import { twMerge } from 'tailwind-merge'

import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useRoute } from '_STR/useRoute'

export function Description() {
  const projectSlug = useRoute((st) => st.data.params.slug)

  const project = useFetcherProjects((st) => (projectSlug ? st.data.pages[projectSlug] : undefined))

  if (project?.status !== 'loaded') return null
  return (
    <div
      dangerouslySetInnerHTML={{ __html: project.content }}
      className={twMerge(
        'flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)]',
        '[&_p]:text-[clamp(0.875rem,1vw,1.5rem)] [&_p]:leading-[calc(1.25/0.875),2vw,calc(2/1.5)] [&_p]:font-light',
        '[&_h2]:mt-[clamp(0.5rem,1.5vw,2rem)] [&_h2]:text-[clamp(1.25rem,1.85vw,3.25rem)] [&_h2]:leading-[calc(1.75/1.25),2vw,2.25] [&_h2]:font-medium [&_h2]:first:mt-0',
        '[&_ol]:list-inside [&_ol]:list-decimal [&_ol]:text-[clamp(0.875rem,1vw,1.5rem)] [&_ol]:leading-[calc(1.25/0.875),2vw,calc(2/1.5)] [&_ol]:font-light [&_ol]:marker:font-medium',
        '[&_ul]:list-inside [&_ul]:list-disc [&_ul]:text-[clamp(0.875rem,1vw,1.5rem)] [&_ul]:leading-[calc(1.25/0.875),2vw,calc(2/1.5)] [&_ul]:font-light [&_ul]:marker:font-medium',
      )}
    />
  )
}
