import { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { overlapController, scrollingController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollingController = scrollingController()
  const OverlapController = overlapController()
  ScrollingController.scrollTo(0, { immediate: true })

  useEffect(() => {
    ScrollingController.resize()
    OverlapController.reset()
  }, [])

  return children
}
