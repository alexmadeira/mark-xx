import { useEffect } from 'react'

import { analytics } from '_SRV/builder/analytics'

export function Analytics() {
  useEffect(analytics().init, [])
  return null
}
