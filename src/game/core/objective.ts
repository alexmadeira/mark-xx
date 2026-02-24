import type { TObjectiveProps, TObjectiveSpawnProps } from '@GAMETypes/core/objective'

import { Entity } from './entity'
import { UniqueEntityID } from './unique-entity-id'

export abstract class Objective<TProps> extends Entity<TObjectiveProps & TProps> {
  protected constructor(props: TObjectiveProps & TProps, id?: UniqueEntityID) {
    super(props, id)
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
