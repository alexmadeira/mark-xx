import type { ILoaderProgress } from '@/interfaces/loader/progress'

import { BProgress } from '@bprogress/core'
import _ from 'lodash'

export class LoaderProgress implements ILoaderProgress {
  protected constructor() {
    _.bindAll(this, ['set', 'start', 'done'])

    this.buildProgressBar()
  }

  static create() {
    return new LoaderProgress()
  }

  private buildProgressBar() {
    BProgress.configure({
      minimum: 0.08,
      maximum: 1,
      template: `<div class="bar"><div class="peg"></div></div>
                 <div class="spinner"><div class="spinner-icon"></div></div>
                 <div class="indeterminate"><div class="inc"></div><div class="dec"></div></div>`,
      easing: 'linear',
      positionUsing: 'width',

      speed: 100,
      trickle: false,
      trickleSpeed: 10000,
      showSpinner: true,
      indeterminate: false,
    })
  }

  mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return outMin + ((x - inMin) * (outMax - outMin)) / (inMax - inMin)
  }

  public set(size: number) {
    BProgress.set(size)
  }

  public start() {
    // BProgress.start()
  }

  public done() {
    BProgress.done()
  }
}
