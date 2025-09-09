import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

export function HeaderTitle() {
  const pageProperties = useFetcherPages((st) => st.data.projects?.properties)

  return (
    <div className="my-[clamp(1rem,4vw,5rem)] w-full">
      <div className="md:px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)] px-8">
        <h1
          className={twMerge(
            'text-black-900 w-full text-[clamp(2rem,9vw,8rem)] tracking-widest',
            '4xl:text-[clamp(13rem,10vw,17rem)] leading-none',
          )}
        >
          {pageProperties?.name}
        </h1>
      </div>
    </div>
  )
}
