import { useEffect } from 'react'

import { easterEggController } from '_SRV/controller'
import { registerEggListeners } from '_SRV/register'

export function EventEggs() {
  const CLEasterEgg = easterEggController()
  const REggListeners = registerEggListeners()

  useEffect(() => {
    REggListeners.register(CLEasterEgg)
    return () => REggListeners.unregister()
  }, [])

  return null
}
