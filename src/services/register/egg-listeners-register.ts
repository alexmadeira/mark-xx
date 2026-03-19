import type { EasterEggController } from '_SRV/controller/easter-egg-controller'
import type { IRegister } from '@/interfaces/register'
import type { TSchemaEasterEggEvent } from '@/services/schema/easter-egg'

import _ from 'lodash'

export class EggListenersRegister implements IRegister {
  private disposers: (() => void)[] = []

  constructor(private readonly eggEvents: TSchemaEasterEggEvent[]) {}

  public register(controller: EasterEggController) {
    this.eggEvents.forEach(({ emitter, event, readEgg, foundEgg }) => {
      const handler = () => {
        if (readEgg) controller.readEgg(readEgg)
        if (foundEgg) controller.foundEgg(foundEgg)
      }

      emitter.on(event, handler)
      this.disposers.push(() => emitter.off(event, handler))
    })
  }

  public unregister() {
    this.disposers.forEach((dispose) => dispose())
    this.disposers = []
  }
}
