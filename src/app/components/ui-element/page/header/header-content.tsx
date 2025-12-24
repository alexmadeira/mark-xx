import type { TPageHeaderContentProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

import { useHeader } from './header-context'

export function HeaderContent(props: TPageHeaderContentProps) {
  const context = useHeader()
  const pageName = context.page || props.page

  if (!pageName) throw new Error('prop page is required to HeaderContent')

  const page = useFetcherPages((st) => st.data[pageName])

  return (
    <div className={twMerge('mt-5 flex w-full flex-col space-y-[clamp(1.5rem,_10vw,_6rem)]', 'lg:mt-0')}>
      <div className="w-full">
        <div
          className={twMerge(
            'mx-auto grid w-full grid-cols-1 flex-col gap-5 px-8',
            'md:gap-10 md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
            'lg:px-x-container lg:grid-cols-12',
          )}
        >
          <div className="lg:col-span-12 xl:col-span-3 2xl:col-span-3">
            <h2 className={twMerge('text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[clamp(2rem,4vw,3rem)] font-normal')}>
              {page?.subTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-20 lg:col-span-12 xl:col-span-9 2xl:col-span-9">
            <div
              className="flex flex-col gap-[clamp(1rem,2vw,2rem)] text-[clamp(1rem,2vw,1.5rem)] leading-[clamp(1.5rem,3vw,2rem)] font-light"
              dangerouslySetInnerHTML={{ __html: page.content || '' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
