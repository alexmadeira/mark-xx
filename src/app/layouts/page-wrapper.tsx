import { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { scrollingController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollingController = scrollingController()

  ScrollingController.scrollTo(0, { immediate: true })

  useEffect(() => {
    ScrollingController.resize()
  }, [])

  return children
}
