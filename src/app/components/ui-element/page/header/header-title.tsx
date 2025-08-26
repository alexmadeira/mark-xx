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
    <div className={twMerge('my-[clamp(1rem,4vw,5rem)] w-full', className)}>
      <div className="px-x-container mx-auto flex w-full flex-col gap-[clamp(0.5rem,2vw,2.5rem)]">
        <h1 className="text-black-900 w-full text-[clamp(3rem,11.75vw,8rem)] leading-none tracking-widest">
          {page?.properties?.name}
        </h1>
        {children}
      </div>
    </div>
  )
}
