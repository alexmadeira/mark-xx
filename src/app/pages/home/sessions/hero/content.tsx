import { contentPreseter } from '_SRV/preseter'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Content() {
  const preseter = contentPreseter('home')
  const pageContent = useFetcherPages((st) => st.data.home?.content)

  const [description] = preseter.contentHtml(pageContent)
  return (
    <div className="relative z-1 mt-auto w-full pb-[clamp(1rem,3vw,5rem)]">
      <div className="px-x-container flex h-full w-full flex-1 flex-col items-start justify-between gap-4 pb-[clamp(1.25rem,3vw,2.5rem)] md:flex-row md:items-center">
        <div className="flex flex-1" dangerouslySetInnerHTML={{ __html: description }} />
        <div className="relative z-1 flex flex-1 flex-col items-start gap-1 md:items-end">
          <a
            href="#"
            className="text-[clamp(1rem,1.5vw,1.875rem)] leading-[clamp(1.5rem,1.5vw,2.5rem)] underline transition-colors duration-200"
          >
            alex.c.madeira@gmail.com
          </a>
          <ul className="flex w-full items-center justify-center gap-5 text-[clamp(0.875rem,1.5vw,1.5rem)] leading-[clamp(1.25rem,1.5vw,2rem)] md:justify-end">
            <li>
              <a href="#" className="underline transition-colors duration-200">
                Linkedin
              </a>
            </li>
            <li>
              <a href="#" className="underline transition-colors duration-200">
                Github
              </a>
            </li>
            <li>
              <a href="#" className="underline transition-colors duration-200">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
