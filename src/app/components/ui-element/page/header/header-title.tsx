import type { TPageHeaderTitleProps } from '@/props/components/ui-element/page/header'

import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

import { useHeader } from './header-context'

export function HeaderTitle({ className, children, ...props }: TPageHeaderTitleProps) {
  const context = useHeader()
  const pageName = context.page || props.page

  if (!pageName) throw new Error('prop page is required to HeaderTitle')

  const page = useFetcherPages((st) => st.data[pageName])

  return (
    <div {...props} className={twMerge('my-0 w-full', 'md:my-[clamp(1rem,4vw,5rem)]', className)}>
      <div className="px-x-container mx-auto flex w-full flex-col gap-0">
        <h1
          className={twMerge(
            'text-black-900 w-full text-4xl tracking-widest sm:text-5xl',
            'md:text-[clamp(2rem,9vw,8rem)]',
            '4xl:text-[clamp(13rem,10vw,17rem)] leading-none',
          )}
        >
          {page?.properties?.name}
        </h1>
        {children}
      </div>
    </div>
  )
}
