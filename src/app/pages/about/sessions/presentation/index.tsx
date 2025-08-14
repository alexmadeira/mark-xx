import { contentPreseter } from '_SRV/preseter'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Presentation() {
  const preseter = contentPreseter('about')
  const pageContent = useFetcherPages((st) => st.data.about.content)

  const [title, ...content] = preseter.contentHtml(pageContent)
  return (
    <div className="w-full">
      <div className="px-x-container mx-auto grid w-full grid-cols-1 flex-col gap-5 md:gap-10 lg:grid-cols-12">
        <div className="lg:col-span-12 xl:col-span-3 2xl:col-span-3" dangerouslySetInnerHTML={{ __html: title }} />

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
