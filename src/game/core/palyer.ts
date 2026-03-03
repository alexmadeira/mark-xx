import type { TPlayerProps } from '@/interfaces/game/entity/player'

import _ from 'lodash'

import { Entity } from './entity'

export abstract class Palyer<TProps = unknown> extends Entity<TPlayerProps<TProps>> {
  private isAlive: boolean

  protected constructor(props: TPlayerProps<TProps>) {
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
