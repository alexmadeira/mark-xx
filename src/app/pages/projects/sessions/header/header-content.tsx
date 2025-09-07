import { contentPreseter } from '_SRV/preseter'

import { useFetcherPages } from '_STR/useFetcherPages'

export function HeaderContent() {
  const preseter = contentPreseter('projects')
  const pageProperties = useFetcherPages((st) => st.data.projects?.properties)
  const pageContent = useFetcherPages((st) => st.data.projects?.content)

  const content = preseter.contentHtml(pageContent)

  return (
    <div className="flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]">
      <div className="w-full">
        <div className="md:px-x-container mx-auto grid w-full grid-cols-1 flex-col gap-5 px-8 md:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-12 xl:col-span-3 2xl:col-span-3">
            <h2 className="text-black-900 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal">
              {pageProperties?.subTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-20 lg:col-span-12 xl:col-span-9 2xl:col-span-9">
            <div
              className="flex flex-col gap-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,2vw,1.5rem)] leading-[clamp(1.5rem,3vw,2rem)] font-light"
              dangerouslySetInnerHTML={{ __html: content.join('') }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
