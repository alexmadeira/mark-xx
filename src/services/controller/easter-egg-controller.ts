import type {
  TEasterEggAddEggProps,
  TEasterEggAddEggsProps,
  TEasterEggDispatchEggProps,
  TEasterEggReadEggProps,
} from '@/services/controller/easter-egg'

import _ from 'lodash'
import Mousetrap from 'mousetrap'

import { useEasterEgg } from '_STR/useEasterEgg'

export class EasterEggController {
  private readonly easterEggActions = useEasterEgg.getState().actions

  constructor() {
    _.bindAll(this, ['readEgg', 'addEgg', 'addEggs'])
  }

  private dispatchEgg(...[name]: TEasterEggDispatchEggProps) {
    this.easterEggActions.call(name)
  }

  public readEgg(...[name]: TEasterEggReadEggProps) {
    this.easterEggActions.read(name)
  }

  public addEgg(props: TEasterEggAddEggProps) {
    if (_.has(useEasterEgg.getState().data.eggs, props.name)) return

    this.easterEggActions.setEgg(props.name)
    Mousetrap.bind(props.keyCombo.join(' '), this.dispatchEgg.bind(this, props.name))
  }

  public addEggs(eggs: TEasterEggAddEggsProps) {
    eggs.map(this.addEgg.bind(this))
  }
}
