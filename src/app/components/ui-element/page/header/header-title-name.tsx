import type { TPageHeaderTitleNameProps } from '@/props/components/ui-element/page/header'

import _ from 'lodash'
import { motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { useFetcherPages } from '_STR/useFetcherPages'

import { useHeader } from './header-context'

export function HeaderTitleName(props: TPageHeaderTitleNameProps) {
  const context = useHeader()
  const name = context.page || props.page

  if (!name) throw new Error('prop page is required to HeaderTitle')

  const page = useFetcherPages((st) => st.data[name])

  const isLoaded = page.status === 'loaded'
  return (
    <div className="h-fit w-full overflow-hidden">
      <h1
        role="heading"
        aria-label={page.title}
        className={twMerge(
          'flex w-full items-center text-[clamp(2rem,10vw,17rem)] leading-[clamp(4rem,12vw,20rem)] font-medium tracking-widest',
        )}
      >
        {isLoaded &&
          _.map([...page.title], (char, i) => (
            <motion.span
              key={`${page.id}:${char}:${i}`}
              exit={{ y: '150%' }}
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.2, ease: 'easeInOut', delay: i * 0.03 }}
              aria-hidden="true"
              children={char}
              className="flex justify-start"
            />
          ))}
      </h1>
    </div>
  )
}
// 0.25
