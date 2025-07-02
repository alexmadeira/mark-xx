import type { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { scrollingController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollingController = scrollingController()

  useEffect(() => {
    ScrollingController.scrollTo(0, { force: true, immediate: true })
    setTimeout(() => {
      ScrollingController.resize()
    }, 500)
  }, [])

  return children
}
