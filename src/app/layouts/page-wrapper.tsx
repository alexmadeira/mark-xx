import { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { overlapController, scrollingController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollingController = scrollingController()
  const OverlapLogoController = overlapController('logo')
  const OverlapNavigationAboutController = overlapController('navigation:about')
  const OverlapNavigationProjectsController = overlapController('navigation:projects')

  ScrollingController.scrollTo(0, { immediate: true })

  useEffect(() => {
    ScrollingController.resize()
    OverlapLogoController.reset()
    OverlapNavigationAboutController.reset()
    OverlapNavigationProjectsController.reset()
  }, [])

  return children
}
