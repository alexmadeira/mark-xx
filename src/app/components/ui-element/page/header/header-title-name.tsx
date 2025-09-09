import type { TPageHeaderTitleNameProps } from '@/props/components/ui-element/page/header'

import _ from 'lodash'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

import { useHeader } from './header-context'

export function HeaderTitleName(props: TPageHeaderTitleNameProps) {
  const context = useHeader()
  const pageName = context.page || props.page

  if (!pageName) throw new Error('prop page is required to HeaderTitle')

  const page = useFetcherPages((st) => st.data[pageName])

  const name = page?.properties?.name?.replace(/\s+/g, '\u00A0') || ''

  return (
    <div className="my-2 h-fit w-full overflow-hidden">
      <h1
        role="text"
        aria-label={page?.properties?.name}
        className={twMerge(
          'flex w-full items-center text-4xl leading-[120%] font-medium tracking-widest',
          'sm:text-5xl',
          'md:text-[clamp(2rem,9vw,8rem)]',
          '4xl:text-[clamp(13rem,10vw,17rem)]',
        )}
      >
        {_.map([...name], (char, i) => (
          <motion.span
            key={`${page?.properties?.id}:${char}:${i}`}
            exit={{ y: '150%' }}
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.2, ease: 'easeInOut', delay: i * 0.03 }}
            aria-hidden="true"
            children={char}
            className="flex"
          />
        ))}
      </h1>
    </div>
  )
}
