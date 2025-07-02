import type { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { scrollingController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollingController = scrollingController()

  useEffect(() => {
    ScrollingController.restart()
  }, [])

  return children
}
