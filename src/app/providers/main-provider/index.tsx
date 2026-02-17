import type { TMainProviderProps } from '@/providers/main'

import { useEffect } from 'react'

import { mouseController } from '_SRV/controller'

import { PageColors } from './page-colors'

export function MainProvider({ children }: TMainProviderProps) {
  const CLMouse = mouseController()

  useEffect(() => {
    CLMouse.init()

    return () => CLMouse.init()
  }, [])

  return (
    <>
      <PageColors />
      {children}
    </>
  )
}
