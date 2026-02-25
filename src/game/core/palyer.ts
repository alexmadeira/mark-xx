import type { TPlayerProps } from '@GAMETypes/core/palyer'

import _ from 'lodash'

import { Entity } from './entity'

export abstract class Palyer<TProps> extends Entity<TProps & TPlayerProps> {
  private isAlive: boolean

  protected constructor(props: TProps & TPlayerProps) {
    super(props)
    this.isAlive = true
  }

  public kill() {
    this.isAlive = false
  }

  public get alive() {
    return this.isAlive
  }
}
