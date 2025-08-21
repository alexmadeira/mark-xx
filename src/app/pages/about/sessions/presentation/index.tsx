import { contentPreseter } from '_SRV/preseter'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Presentation() {
  const preseter = contentPreseter('about')
  const pageProperties = useFetcherPages((st) => st.data.about.properties)
  const pageContent = useFetcherPages((st) => st.data.about.content)

  const content = preseter.contentHtml(pageContent)

  return (
    <div className="w-full">
      <div className="px-x-container mx-auto grid w-full grid-cols-1 flex-col gap-5 md:gap-10 lg:grid-cols-12">
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
          <div className="hidden flex-col gap-8 sm:flex">
            <a href="#" className="text-[clamp(1.75rem,2vw,1.875rem)] leading-[clamp(1.875rem,2vw,2.25rem)] underline">
              alex.c.madeira@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
