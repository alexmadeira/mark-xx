import { useEffect } from 'react'

import { mouseController } from '_SRV/controller'

export function MouseTrack() {
  useEffect(mouseController().init, [])
  return null
}
