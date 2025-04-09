import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMeasure } from 'react-use'

import { useElement } from '_STR/useElement'

import { Logo } from '../ui-element/logo'

import { Nav } from './nav'

export function Header() {
  const [headerRef, props] = useMeasure<HTMLDivElement>()
  const setBlockProps = useElement.getState().actions.setBlock

  useEffect(() => {
    setBlockProps('header', props)
  }, [props, setBlockProps])

  return (
    <div ref={headerRef} className="fixed top-0 left-0 z-10 w-full">
      <div className="w-full pt-10">
        <div className="mx-auto flex w-full flex-row items-center gap-[clamp(0.5rem,_2vw,_2.5rem)] px-[clamp(1.25rem,_5vw,_5rem)]">
          <Link to="/">
            <Logo className="w-[clamp(3rem,_8vw,_5rem)]" />
          </Link>
          <Nav />
        </div>
      </div>
    </div>
  )
}
