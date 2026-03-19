import { useEffect } from 'react'

import { activityController } from '_SRV/controller'

export function Idle() {
  const CLActivity = activityController()
  useEffect(() => {
    CLActivity.createMonitor('main', {
      timeout: 1000 * 20,
      events: ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'],
    })
  })
  return null
}
