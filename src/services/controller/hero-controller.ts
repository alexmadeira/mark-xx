import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { ApiRequester } from '_SRV/api/api-requester'
import type { THeroProps, THeroTypeContent } from '@/services/controller/hero-controller'
import type { Nullish } from '@/utils/nullish'

import _ from 'lodash'

import { useHero } from '_STR/useHero'

export class HeroController {
  private readonly heroActions = useHero.getState().actions

  private _typingIndex: number = 0
  private _typingLetter: number = 0
  private _typingInterval: Nullish<NodeJS.Timeout> = null
  private _typingWaitTimeout: Nullish<NodeJS.Timeout> = null
  private _typingSequence: THeroTypeContent[] = []

  protected constructor(
    private readonly props: THeroProps,
    private readonly api: ApiRequester<typeof markXXPaths>,
  ) {
    this.setup()
  }

  public static create(props: THeroProps, api: ApiRequester<typeof markXXPaths>) {
    return new HeroController(props, api)
  }

  private async setup() {
    await this.buildTypingSequence()
    this.start()
  }

  private async buildTypingSequence() {
    try {
      this.heroActions.setStatus('loading')
      const technologies = await this.api.query('mark-xx:tecnologies', 'mark-xx:tecnologies')
      if (!technologies) return

      this._typingSequence = technologies.map((tech) => ({
        ...tech,
        ...this.typingMeta,
      }))
      this.heroActions.setStatus('loaded')
    } catch (error) {
      this.heroActions.setStatus('error')
      console.error('Error fetching hero banners:', error)
    }
  }

  private write() {
    this.clearTimer()

    this._typingInterval = setInterval(() => {
      this._typingLetter++
      this.heroActions.setCurrent(this.current.type.slice(0, this._typingLetter), this.current)
      if (this._typingLetter >= this.current.type.length) {
        this.clearTimer()

        this._typingWaitTimeout = setTimeout(() => this.erase(), this.current.waitTime)
      }
    }, this.current.writingSpeed)
  }

  private erase() {
    this.clearTimer()

    this._typingInterval = setInterval(() => {
      this._typingLetter--
      this.heroActions.setCurrent(this.current.type.slice(0, this._typingLetter), this.current)

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
    return this.props.speed
  }

  public get deletionSpeed() {
    return this.props.deletionSpeed
  }

  public get delay() {
    return this.props.delay
  }

  public get settings() {
    return this.props.settings
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
