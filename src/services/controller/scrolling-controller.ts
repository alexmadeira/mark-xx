import type { TScrollingCreateProps, TScrollingProps, TScrollingScrollToProps } from '@/services/controller/scrolling'

import Lenis from 'lenis'
import _ from 'lodash'

import { useScrolling } from '_STR/useScrolling'

export class ScrollingController {
  private readonly _actions = useScrolling.getState().actions

  protected constructor(private readonly props: TScrollingProps) {
    this._actions.setDetails(this.props.lenis)
    this.ev.on('scroll', this.setDetails.bind(this))

    _.bindAll(this, ['stop', 'start', 'restart', 'none', 'resize', 'fromStart', 'scrollTo'])
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
    this.props.lenis.stop()
  }

  public none() {
    document.documentElement.style.setProperty('overflow-y', 'scroll')
    document.getElementsByTagName('body')[0].style.setProperty('overflow', 'hidden')

    this.stop()
  }

  public start() {
    document.documentElement.style.removeProperty('overflow')
    document.getElementsByTagName('body')[0].style.removeProperty('overflow')

    this.props.lenis.start()
    this.props.lenis.resize()
  }

  public restart() {
    this.props.lenis.stop()
    this.props.lenis.start()
  }

  public resize() {
    this.props.lenis.resize()
  }

  public fromStart() {
    this.props.lenis.scrollTo(0, { immediate: true })
  }

  public scrollTo(...[target, duration = 1.2]: TScrollingScrollToProps) {
    const lenis = this.props.lenis

    let cancelled = false

    const cancel = () => {
      cancelled = true
      lenis.stop()
      lenis.start()
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
    }

    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })

    lenis.scrollTo(target, {
      duration,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),

      onComplete: () => {
        if (!cancelled) {
          window.removeEventListener('wheel', cancel)
          window.removeEventListener('touchstart', cancel)
        }
      },
    })
  }

  public get ev() {
    return this.props.lenis
  }
}
