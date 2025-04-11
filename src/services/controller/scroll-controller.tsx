import type {
  TScrollCreateProps,
  TScrollProps,
  TScrollScrollToOption,
  TScrollTarget,
} from '@/services/controller/scroll'

import Lenis from 'lenis'

import { useScroll } from '_STR/useScroll'

export class ScrollController {
  private readonly _actions = useScroll.getState().actions

  protected constructor(private readonly _props: TScrollProps) {
    this._actions.setDetails(this._props.lenis)
    this._props.lenis.on('scroll', this.setDetails.bind(this))
  }

  public static create(props: TScrollCreateProps) {
    return new ScrollController({
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

  public scrollTo(target: TScrollTarget, options?: TScrollScrollToOption) {
    this._props.lenis.scrollTo(target, options)
  }

  public get scroll() {
    return this._props.lenis
  }
}
