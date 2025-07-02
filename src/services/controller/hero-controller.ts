import type { TDataTechnologies } from '@/services/content-data/technologies'
import type { THeroProps, THeroTypeContent, THeroTypingSequence } from '@/services/controller/hero-controller'
import type { Nullish } from '@/utils/nullish'

import _ from 'lodash'

import { technologies } from '_SRV/content-data/technologies'

import { useHero } from '_STR/useHero'

export class HeroController {
  private readonly heroActions = useHero.getState().actions

  private _typingIndex: number = 0
  private _typingLetter: number = 0
  private _typingInterval: Nullish<NodeJS.Timeout> = null
  private _typingWaitTimeout: Nullish<NodeJS.Timeout> = null
  private _typingSequence: THeroTypingSequence = []

  constructor(private readonly _props: THeroProps) {
    this.setup()
  }

  public static create(props: THeroProps) {
    return new HeroController(props)
  }

  private setup() {
    this.buildTypingSequence()
  }

  private buildTypingSequence() {
    this._typingSequence = _.flatMap<TDataTechnologies, THeroTypeContent>(technologies, (tech, key) => [
      {
        id: tech?.id || key,
        name: tech?.name || tech?.typing || key,
        color: tech?.color || 'none',
        banner: tech?.banner || '',
        content: tech?.typing || tech?.name || key,
        ...this.typingMeta,
      },
    ])
  }

  private write() {
    this.clearTimer()

    this._typingInterval = setInterval(() => {
      this._typingLetter++
      this.heroActions.setCurrent(this.current.content.slice(0, this._typingLetter), this.current)
      if (this._typingLetter >= this.current.content.length) {
        this.clearTimer()
        this._typingWaitTimeout = setTimeout(() => this.erase(), this.current.waitTime)
      }
    }, this.current.writingSpeed)
  }

  private erase() {
    this.clearTimer()

    this._typingInterval = setInterval(() => {
      this._typingLetter--
      this.heroActions.setCurrent(this.current.content.slice(0, this._typingLetter), this.current)

      if (this._typingLetter <= 0) {
        this.clearTimer()
        this._typingIndex = (this._typingIndex + 1) % this.typingSequence.length
        this.write()
      }
    }, this.current.eraseSpeed)
  }

  private clearTimer() {
    if (this._typingWaitTimeout) {
      clearTimeout(this._typingWaitTimeout)
      this._typingWaitTimeout = null
    }

    if (this._typingInterval) {
      clearInterval(this._typingInterval)
      this._typingInterval = null
    }
  }

  public start() {
    this.write()
  }

  public stop() {
    this.clearTimer()
  }

  public get speed() {
    return this._props.speed
  }

  public get deletionSpeed() {
    return this._props.deletionSpeed
  }

  public get delay() {
    return this._props.delay
  }

  public get settings() {
    return this._props.settings
  }

  public get typingMeta() {
    return {
      waitTime: this.delay,
      eraseSpeed: this.deletionSpeed,
      writingSpeed: this.speed,
    }
  }

  public get typingSequence() {
    return this._typingSequence
  }

  public get current() {
    return this.typingSequence[this._typingIndex]
  }
}
