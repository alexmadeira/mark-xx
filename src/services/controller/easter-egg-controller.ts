import type {
  TEasterEggAddEggProps,
  TEasterEggAddEggsProps,
  TEasterEggDispatchEggProps,
  TEasterEggEgg,
  TEasterEggFoundEggProps,
  TEasterEggReadEggProps,
} from '@/services/controller/easter-egg'

import _ from 'lodash'
import Mousetrap from 'mousetrap'

import { useEasterEgg } from '_STR/useEasterEgg'

export class EasterEggController<TEggs extends TEasterEggEgg[] = []> {
  private readonly easterEggActions = useEasterEgg.getState().actions

  constructor() {
    _.bindAll(this, ['readEgg', 'addEgg', 'addEggs'])
    Mousetrap.bind('escape', () => {
      Object.entries(useEasterEgg.getState().data.eggs).forEach(([name]) => {
        this.readEgg(name)
      })
    })
  }

  private dispatchEgg(...[name]: TEasterEggDispatchEggProps<TEggs>) {
    this.easterEggActions.call(name)
  }

  public addEgg(props: TEasterEggAddEggProps) {
    if (_.has(useEasterEgg.getState().data.eggs, props.name)) return

    this.easterEggActions.setEgg(props.name)

    if (props.keyCombo) Mousetrap.bind(props.keyCombo.join(' '), this.foundEgg.bind(this, props.name))
  }

  public addEggs(eggs: TEasterEggAddEggsProps) {
    eggs.map(this.addEgg.bind(this))
  }

  public readEgg(...[name]: TEasterEggReadEggProps<TEggs>) {
    this.easterEggActions.read(name)
  }

  public foundEgg(...[name]: TEasterEggFoundEggProps<TEggs>) {
    this.dispatchEgg(name)
  }
}
