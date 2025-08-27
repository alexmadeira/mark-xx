import { useParams } from 'react-router-dom'

import { contentPreseter } from '_SRV/preseter'

import { useFetcherProjects } from '_STR/useFetcherProjects'

export function Description() {
  const { slug } = useParams()
  if (!slug) throw new Error('Project slug is required')
  const preseter = contentPreseter('project')

  const page = useFetcherProjects((st) => st.data.pages[slug])

  const content = preseter.contentHtml(page?.content)

  return (
    <div
      className="flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)] pl-[clamp(0.375rem,0.85vw,1.25rem)]"
      dangerouslySetInnerHTML={{ __html: content.join('') }}
    />
  )
}
