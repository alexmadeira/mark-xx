import _ from 'lodash'

import { snakeEvent } from '_SRV/builder/event'

export class ScoreSystem {
  private score = 0

  constructor() {
    _.bindAll(this, ['increase'])
  }

  private increase() {
    this.add(1)
  }

  public reset() {
    this.score = 0
  }

  public add(points: number) {
    this.score += points
  }

  public create() {
    snakeEvent.on('SNAKE:FOOD:consume', this.increase)
  }

  public destroy() {
    snakeEvent.off('SNAKE:FOOD:consume', this.increase)
  }

  public get value() {
    return this.score
  }
}
