import type { TPlayerProps } from '@GAMETypes/core/palyer'

import _ from 'lodash'

import { Entity } from './entity'
import { UniqueEntityID } from './unique-entity-id'

export abstract class Palyer<TProps> extends Entity<TProps & TPlayerProps> {
  private isAlive: boolean

  protected constructor(props: TProps & TPlayerProps, id?: UniqueEntityID) {
    super(props, id)
    this.isAlive = true
  }

  public kill() {
    this.isAlive = false
  }

  public get alive() {
    return this.isAlive
  }
}
