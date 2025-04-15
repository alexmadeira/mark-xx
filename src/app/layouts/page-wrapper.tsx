import { TPageWrapperProps } from '@/props/layouts/page-wrapper'

import { useEffect } from 'react'

import { scrollController } from '_SRV/controller'

export function PageWrapper({ children }: TPageWrapperProps) {
  const ScrollController = scrollController()

  ScrollController.scrollTo(0, { immediate: true })

  useEffect(() => {
    ScrollController.resize()
  }, [])

  return children
}
