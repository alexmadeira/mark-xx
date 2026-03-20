import { useEffect } from 'react'

import { activityController } from '_SRV/controller'

import { env } from '~/env'

export function Idle() {
  const CLActivity = activityController()
  useEffect(() => {
    CLActivity.createMonitor('main', {
      timeout: env.VITE_EGGS_IDLE_TIMEOUT,
      events: ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'],
    })
  })
  return null
}
