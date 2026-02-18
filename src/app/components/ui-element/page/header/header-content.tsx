import type { TPageHeaderContentProps } from '@/props/components/ui-element/page/header'

import { QuoteSVG } from '_APP/components/ui-element/svg/quote'
import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

import { useHeader } from './header-context'

export function HeaderContent(props: TPageHeaderContentProps) {
  const context = useHeader()
  const pageName = context.page || props.page

  if (!pageName) throw new Error('prop page is required to HeaderContent')

  const page = useFetcherPages((st) => st.data[pageName])

  return (
    <div className={twMerge('mt-5 flex w-full flex-col space-y-[clamp(1.5rem,10vw,6rem)]', 'lg:mt-0')}>
      <div
        data-quote={!!page?.quote}
        className={twMerge(
          'group relative mx-auto grid w-full grid-cols-1 flex-col gap-5 px-8',
          'md:gap-10 md:px-[max(calc(var(--spacing-safe-area-x)+1rem),2rem)]',
          'lg:px-x-container lg:grid-cols-12',
        )}
      >
        <h2
          className={twMerge(
            'text-[clamp(1.5rem,2vw,3.5rem)] leading-[clamp(1.825rem,2.25vw,4rem)] font-normal lg:col-span-12',
            'group-data-[quote=false]:xl:col-span-3 group-data-[quote=false]:2xl:col-span-3',
          )}
        >
          {page?.subTitle}
        </h2>
        <div
          className={twMerge(
            'flex flex-col gap-[clamp(0.75rem,2vw,3rem)] text-[clamp(1rem,1.4vw,2rem)] leading-[clamp(1.35rem,1.75vw,2.5rem)] font-light lg:col-span-12',
            'group-data-[quote=false]:xl:col-span-9 group-data-[quote=false]:2xl:col-span-9',
            'group-data-[quote=true]:xl:col-span-8 group-data-[quote=true]:2xl:col-span-8',
          )}
          dangerouslySetInnerHTML={{ __html: page.description }}
        />
        {page?.quote && (
          <div className="sticky top-(--header-measure-height) col-span-3 col-start-10 my-[clamp(1rem,1.5vw,3rem)] hidden h-fit gap-[clamp(0.75rem,1vw,2rem)] xl:flex">
            <QuoteSVG className="absolute -top-[calc(clamp(2.25rem,2.825vw,3.75rem)/2.5)] -left-[clamp(2.25rem,2.825vw,3.75rem)*1.05] h-[clamp(2.25rem,2.825vw,3.75rem)] w-[clamp(2.25rem,2.825vw,3.75rem)] text-current/30" />
            <span className="text-[clamp(1.5rem,2vw,2.5rem)] leading-[clamp(1.825rem,2vw,2.75rem)] font-normal text-current/60">
              {page.quote}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
