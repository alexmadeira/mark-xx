import { useFetcherProjects } from '_STR/useFetcherProjects'

export function Description() {
  const page = useFetcherProjects((st) => st.data)

  console.log('page content:', page)

  return (
    <div
      className="flex w-full flex-col gap-[clamp(0.5rem,1vw,1.5rem)] pl-[clamp(0.375rem,0.85vw,1.25rem)]"
      // dangerouslySetInnerHTML={{ __html: page.content || '' }}
    />
  )
}
