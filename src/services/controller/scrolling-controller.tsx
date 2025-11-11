import type {
  TScrollingCreateProps,
  TScrollingProps,
  TScrollingTarget,
  TScrollingToOption,
} from '@/services/controller/scrolling'

import mobile from 'is-mobile'
import Lenis from 'lenis'
import _ from 'lodash'

import { useScrolling } from '_STR/useScrolling'

export class ScrollingController {
  private readonly _actions = useScrolling.getState().actions

  protected constructor(private readonly _props: TScrollingProps) {
    this._actions.setDetails(this._props.lenis)
    this.ev.on('scroll', this.setDetails.bind(this))

    _.bindAll(this, ['stop', 'start', 'restart', 'none', 'resize', 'fromStart', 'scrollTo'])

    if (mobile()) {
      this._props.lenis.destroy()
    }
  }

  public static create(props: TScrollingCreateProps) {
    return new ScrollingController({
      lenis: new Lenis({ ...props }),
    })
  }

  private setDetails(details: Lenis) {
    this._actions.setDetails({
      limit: details.limit,
      isHorizontal: details.isHorizontal,
      actualScroll: details.actualScroll,
      scroll: details.scroll,
      progress: details.progress,
      isScrolling: details.isScrolling,
      isStopped: details.isStopped,
      isLocked: details.isLocked,
      isSmooth: details.isSmooth,
    })
  }

  public stop() {
    this._props.lenis.stop()
  }

  public none() {
    document.documentElement.style.setProperty('overflow-y', 'scroll')
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'hidden')

    this.stop()
  }

  public start() {
    document.documentElement.style.removeProperty('overflow')
    document.getElementsByTagName('body')[0].style.removeProperty('overflow')

    this._props.lenis.start()
    this._props.lenis.resize()
  }

  public restart() {
    this.fromStart()
    this.resize()
  }

  public resize() {
    this._props.lenis.resize()
  }

  public fromStart() {
    this._props.lenis.scrollTo(0, { immediate: true })
  }

  public scrollTo(target: TScrollingTarget, options?: TScrollingToOption) {
    this._props.lenis.scrollTo(target, options)
  }

  public get ev() {
    return this._props.lenis
  }
}
