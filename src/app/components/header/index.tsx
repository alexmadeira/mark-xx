import { useEffect } from 'react'
import { useMeasure } from 'react-use'

import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

import { elementController } from '_SRV/controller'

import { useElement } from '_STR/useElement'

import { Logo } from './components/logo'
import { Nav } from './components/nav'

export function Header() {
  const CLElementHeader = elementController('header')
  const [headerRef, props] = useMeasure<HTMLDivElement>()
  const headerClassName = useElement((st) => st.data.header.className)

  useEffect(() => {
    CLElementHeader.setMeasure(props)
  }, [props])

  return (
    <div ref={headerRef} className="pointer-events-none fixed top-0 left-0 z-10 w-full">
      <div
        className={twMerge(
          'h-full w-full pt-6 pb-8',
          'sm:pt-6 sm:pb-7',
          'lg:pt-[clamp(calc(var(--spacing)_*_6),3vw,calc(var(--spacing)_*_10))] lg:pb-[clamp(calc(var(--spacing)_*_6),6vw,calc(var(--spacing)_*_20))]',
          headerClassName,
        )}
      >
        <div
          className={twMerge(
            'mx-auto flex w-full flex-row items-center gap-[clamp(0.5rem,2vw,2.5rem)] px-8',
            'md:px-[max(calc(var(--spacing-safe-area-x)+var(--spacing)*4),var(--spacing)*8))]',
            'lg:px-x-container',
          )}
        >
          <Logo />
          <Nav />
        </div>
      </div>
    </div>
  )
}
