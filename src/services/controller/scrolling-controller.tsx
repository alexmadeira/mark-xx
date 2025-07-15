import type {
  TScrollingCreateProps,
  TScrollingProps,
  TScrollingTarget,
  TScrollingToOption,
} from '@/services/controller/scrolling'

import Lenis from 'lenis'

import { useScrolling } from '_STR/useScrolling'

export class ScrollingController {
  private readonly _actions = useScrolling.getState().actions

  protected constructor(private readonly _props: TScrollingProps) {
    this._actions.setDetails(this._props.lenis)
    this.ev.on('scroll', this.setDetails.bind(this))
  }

  public static create(props: TScrollingCreateProps) {
    return new ScrollingController({
      lenis: new Lenis(props),
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

  public start() {
    this._props.lenis.start()
  }

  public restart() {
    this.stop()
    this.start()
    window.scrollTo(0, 0)
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

  public get lenis() {
    return this._props.lenis
  }

  public get ev() {
    return this._props.lenis
  }
}
