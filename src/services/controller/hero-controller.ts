import type { THeroControll, THeroProps, THeroTimeout } from '@/services/controller/hero-controller'

import _ from 'lodash'

import { timer } from '_SRV/utils/timer'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'
import { useHero } from '_STR/useHero'

export class HeroController {
  private isRunning = false
  private readonly controll: THeroControll
  private readonly heroActions = useHero.getState().actions

  private typingInterval: THeroTimeout
  private typingWaitTimeout: THeroTimeout

  protected constructor(private readonly _props: THeroProps) {
    _.bindAll(this, ['write', 'erase', 'start', 'stop'])

    this.controll = { hero: 0, letter: 0 }
  }

  public static create(props: THeroProps) {
    return new HeroController(props)
  }

  private next() {
    this.controll.hero = (this.controll.hero + 1) % this.heroContent.length
    this.heroActions.setCurrent(this.currentHero)
    this.write()
  }

  private write() {
    this.clearTimer()

    this.typingInterval = timer.interval(() => {
      this.controll.letter++
      this.heroActions.setTyping(this.currentHero.type.slice(0, this.controll.letter))
      if (this.controll.letter >= this.currentHero.type.length) {
        this.clearTimer()
        this.typingWaitTimeout = timer.delay(this.erase, this.settings.delay)
      }
    }, this.settings.speed)
  }

  private erase() {
    this.clearTimer()

    this.typingInterval = timer.interval(() => {
      this.controll.letter--
      this.heroActions.setTyping(this.currentHero.type.slice(0, this.controll.letter))
      if (this.controll.letter <= 0) {
        this.clearTimer()
        this.next()
      }
    }, this.settings.deletionSpeed)
  }

  private clearTimer() {
    if (this.typingWaitTimeout) this.typingWaitTimeout.cancel()
    if (this.typingInterval) this.typingInterval.cancel()
  }

  private get settings() {
    return {
      delay: this._props.delay,
      speed: this._props.speed,
      deletionSpeed: this._props.deletionSpeed,
    }
  }

  private get heroContent() {
    return useFetcherTechnologies.getState().data.list
  }

  private get currentHero() {
    return this.heroContent[this.controll.hero]
  }

  public start() {
    if (this.isRunning) return
    this.isRunning = true
    this.heroActions.setCurrent(this.currentHero)
    this.write()
  }

  public stop() {
    this.clearTimer()
    this.isRunning = false
  }
}
