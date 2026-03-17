import { useEffect } from 'react'

import { easterEggs } from '_CFG/easter-eggs'

import { easterEggController } from '_SRV/controller'

import { SnakeEgg } from './egg/snake-egg'
import { SonicEgg } from './egg/sonic-egg'
import { ToastyEgg } from './egg/toasty-egg'

export function EasterEggs() {
  const CLEasterEgg = easterEggController()

  useEffect(() => {
    CLEasterEgg.addEggs(easterEggs)
  }, [easterEggs])

  return (
    <div>
      <ToastyEgg />
      <SnakeEgg />
      <SonicEgg />
    </div>
  )
}
