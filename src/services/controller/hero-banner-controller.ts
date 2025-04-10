import { TETechnologyKey } from '@/enums/technology'
import { IHeroBanner, THeroBannerProps, ZHeroBannerTypingSpeed } from '@/services/controller/hero-banner-controller'

import _ from 'lodash'

import { technologies } from '_SRV/content-data/technologies'

import { useHeroBanner } from '_STR/useHeroBanner'

export class HeroBannerController implements IHeroBanner {
  private readonly _actions = useHeroBanner.getState().actions

  protected constructor(private readonly _props: THeroBannerProps) {
    this._actions.setCurrent(technologies[this._props.start])
  }

  public static create(props: THeroBannerProps) {
    return new HeroBannerController(props)
  }

  public setTechnology(technologyKey: TETechnologyKey) {
    this._actions.setCurrent(technologies[technologyKey])
  }

  public get speed() {
    return ZHeroBannerTypingSpeed.parse({
      type: 'keyStrokeDelayInMs',
      value: this._props.speed,
    })
  }

  public get deletionSpeed() {
    return ZHeroBannerTypingSpeed.parse({
      type: 'keyStrokeDelayInMs',
      value: this._props.deletionSpeed,
    })
  }

  public get typingSequence() {
    return _.flatMap(technologies, (tech, key) => [
      () => this.setTechnology(key as TETechnologyKey),
      tech.typing,
      this._props.delay,
    ])
  }
}
