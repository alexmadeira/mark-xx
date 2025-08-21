import { useFetcherPages } from '_STR/useFetcherPages'

export function HeaderTitle() {
  const pageProperties = useFetcherPages((st) => st.data.about?.properties)

  return (
    <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
      <h1 className="text-black-900 w-full text-[clamp(3rem,12vw,8rem)] leading-none tracking-widest">
        {pageProperties?.name}
      </h1>
    </div>
  )
}
