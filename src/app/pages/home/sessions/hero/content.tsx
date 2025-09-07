import { twMerge } from 'tailwind-merge'

import { contentPreseter } from '_SRV/preseter'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Content() {
  const preseter = contentPreseter('home')
  const pageContent = useFetcherPages((st) => st.data.home?.content)

  const content = preseter.contentHtml(pageContent)

  return (
    <div
      className={twMerge(
        'relative z-1 mt-auto w-full pb-7',
        'sm:pb-[clamp(calc(var(--spacing)_*_6),3vw,calc(var(--spacing)_*_10))]',
        'md:pb-[clamp(calc(var(--spacing)_*_6),8vw,calc(var(--spacing)_*_20))]',
      )}
    >
      <div className="md:px-x-container flex h-full w-full flex-1 flex-col items-start justify-between gap-4 px-8 sm:flex-row sm:items-end">
        <div className="flex flex-2" dangerouslySetInnerHTML={{ __html: content.join('') }} />
        <div className="relative z-1 flex flex-1 flex-col items-start gap-2 sm:items-end">
          <a
            href="#"
            className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline transition-colors duration-200"
          >
            alex.c.madeira@gmail.com
          </a>
          <div className="flex w-full items-center justify-center gap-x-3 sm:justify-end">
            <a
              href="#"
              className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline transition-colors duration-200"
            >
              Linkedin
            </a>
            <a
              href="#"
              className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline transition-colors duration-200"
            >
              Github
            </a>
            <a
              href="#"
              className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
