import { useEffect } from 'react'
import { useMeasure } from 'react-use'

import { useElement } from '_STR/useElement'

import { Logo } from './components/logo'
import { Nav } from './nav'

export function Header() {
  const [headerRef, props] = useMeasure<HTMLDivElement>()

  useEffect(() => {
    useElement.getState().actions.setBlock('header', props)
  }, [props])

  return (
    <div ref={headerRef} className="fixed top-0 left-0 z-10 w-full">
      <div className="w-full pt-10">
        <div className="px-x-container mx-auto flex w-full flex-row items-center gap-[clamp(0.5rem,2vw,2.5rem)]">
          <Logo />
          <Nav />
        </div>
      </div>
    </div>
  )
}
