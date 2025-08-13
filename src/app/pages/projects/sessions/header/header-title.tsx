import { useFetcherPages } from '_STR/useFetcherPages'

export function HeaderTitle() {
  const pageProperties = useFetcherPages((st) => st.data.projects.properties)
  const pageStatus = useFetcherPages((st) => st.data.projects.status)

  if (pageStatus !== 'loaded') return null

  return (
    <div className="my-[clamp(1rem,4vw,5rem)] w-full">
      <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
        <h1 className="text-black-900 w-full text-[clamp(3rem,12vw,8rem)] leading-none tracking-widest">
          {pageProperties?.name}
        </h1>
      </div>
    </div>
  )
}
