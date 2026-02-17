import { useEffect } from 'react'

import { globalEggs } from '_CFG/easter-eggs/global-eggs'

import { easterEggController } from '_SRV/controller'

import { ToastyEgg } from './egg/toasty-egg'

export function EasterEggs() {
  const CLEasterEgg = easterEggController()

  useEffect(() => {
    CLEasterEgg.addEggs(globalEggs)
  }, [globalEggs])

  return (
    <div>
      <ToastyEgg />
    </div>
  )
}
