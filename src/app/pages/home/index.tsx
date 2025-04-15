import { Helmet } from 'react-helmet-async'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { HomeMasonry } from '_SRV/builder/masonry'

import { Hero } from './components/hero'

export function Home() {
  const masonry = HomeMasonry.createGrid(20)

  return (
    <>
      <Helmet title="Home" />
      <div>
        <Hero />
        <div className="grid h-full w-full flex-1 grid-flow-row-dense auto-rows-[calc(100vw/5)] grid-cols-5 gap-4">
          {masonry.map((item) => (
            <div
              key={item.id}
              className={twMerge(
                'bg-html-400 flex w-full flex-1 items-center justify-center p-3 text-xl',
                item.className,
              )}
            >
              {item.w}x{item.h}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
