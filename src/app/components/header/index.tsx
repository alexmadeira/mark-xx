import { useEffect } from 'react'
import { useMeasure } from 'react-use'

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
    CLElementHeader.measure = props
  }, [props])

  return (
    <div ref={headerRef} className={twMerge('pointer-events-none fixed top-0 left-0 z-10 w-full', headerClassName)}>
      <div className="w-full pt-[clamp(calc(var(--spacing)_*_6),3vw,calc(var(--spacing)_*_10))]">
        <div className="px-x-container mx-auto flex w-full flex-row items-center gap-[clamp(0.5rem,2vw,2.5rem)]">
          <Logo />
          <Nav />
        </div>
      </div>
    </div>
  )
}
