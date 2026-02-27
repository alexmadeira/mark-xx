import type { TObjectiveProps, TObjectiveSpawnProps } from '@/interfaces/game/entity/objective'

import { Entity } from './entity'

export abstract class Objective<TProps> extends Entity<TObjectiveProps<TProps>> {
  protected constructor(props: TObjectiveProps<TProps>) {
    super(props)
  }

  public get active() {
    return this.props.active
  }

  public consume() {
    this.props.active = false
  }

  protected spawn(...[position]: TObjectiveSpawnProps) {
    this.props.position = position
    this.props.active = true
  }
}
