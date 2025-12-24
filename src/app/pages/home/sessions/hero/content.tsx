import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

export function Content() {
  const home = useFetcherPages((st) => st.data.home)

  return (
    <div
      className={twMerge(
        'relative z-1 mt-auto w-full pb-7',
        'sm:pb-[clamp(calc(var(--spacing)_*_6),3vw,calc(var(--spacing)_*_10))]',
        'lg:pb-[clamp(calc(var(--spacing)_*_6),8vw,calc(var(--spacing)_*_20))]',
      )}
    >
      <div
        className={twMerge(
          'flex h-full w-full flex-1 flex-col items-start justify-between gap-4 px-8 text-[var(--hero-contrast-color)]',
          'sm:flex-row sm:items-end',
          'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
          'lg:px-x-container',
        )}
      >
        <div
          className="flex flex-2 text-[clamp(0.875rem,2vw,2.25rem)] leading-[clamp(1.25rem,2vw,2.5rem)] font-light"
          dangerouslySetInnerHTML={{ __html: home.content || '' }}
        />
        <div className="relative z-1 flex flex-1 flex-col items-start gap-2 sm:items-end">
          <a href="#" className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline">
            alex.c.madeira@gmail.com
          </a>
          <div className="flex w-full items-center justify-center gap-x-3 sm:justify-end">
            <a href="#" className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline">
              Linkedin
            </a>
            <a href="#" className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline">
              Github
            </a>
            <a href="#" className="text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-light underline">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
