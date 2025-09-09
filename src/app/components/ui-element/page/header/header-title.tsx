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
    <div
      {...props}
      className={twMerge(
        'my-4 w-full',
        'sm:mt-8 sm:mb-4',
        'md:mt-[clamp(1rem,4vw,5rem)] lg:mb-[clamp(1.5rem,5.5vw,10rem)]',
        className,
      )}
    >
      <div
        className={twMerge(
          'mx-auto flex w-full flex-col gap-0 px-8',
          'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
          'lg:px-x-container',
        )}
      >
        <h1
          className={twMerge(
            'w-full text-4xl font-medium tracking-widest',
            'sm:text-5xl',
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
