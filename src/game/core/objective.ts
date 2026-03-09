import type { TObjectiveProps, TObjectiveSpawnProps } from '@/interfaces/game/entity/objective'

import { Entity } from './entity'

export abstract class Objective<TProps> extends Entity<TObjectiveProps<TProps>> {
  protected constructor(props: TObjectiveProps<TProps>) {
    super(props)
  }

  protected spawn(...[position]: TObjectiveSpawnProps) {
    this.setPosition(position)
    this.props.active = true
  }

  public consume() {
    this.props.active = false
  }

  public get active() {
    return this.props.active
  }
}
