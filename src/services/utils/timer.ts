import type {
  ITimer,
  TTimerCancel,
  TTimerDebounceProps,
  TTimerDelayProps,
  TTimerFunction,
  TTimerIntervalProps,
  TTimerRafProps,
  TTimerThrottleProps,
} from '@/services/utils/timer'

export class Timer implements ITimer {
  private readonly debounceMap = new Map<string, TTimerCancel>()
  private readonly throttleMap = new Map<string, number>()

  public delay<T extends TTimerFunction>(...[fn, wait, ...args]: TTimerDelayProps<T>) {
    if (!wait) {
      fn(...args)
      return () => {}
    }

    const timeoutId = setTimeout(() => fn(...args), wait)
    return () => clearTimeout(timeoutId)
  }

  public interval<T extends TTimerFunction>(...[fn, wait, ...args]: TTimerIntervalProps<T>) {
    const intervalId = setInterval(() => fn(...args), wait)
    return () => clearInterval(intervalId)
  }

  public debounce<T extends TTimerFunction>(...[key, fn, wait, ...args]: TTimerDebounceProps<T>) {
    this.debounceMap.get(key)?.()

    const cancel = this.delay(fn, wait, ...args)
    this.debounceMap.set(key, cancel)

    return cancel
  }

  public throttle<T extends TTimerFunction>(...[key, fn, wait, ...args]: TTimerThrottleProps<T>) {
    const last = this.throttleMap.get(key) ?? 0
    const now = Date.now()

    if (now - last >= wait) {
      this.throttleMap.set(key, now)
      fn(...args)
    }
  }

  public raf(...[fn]: TTimerRafProps) {
    let frameId: number

    const frameLoop = (time: number) => {
      fn(time)
      frameId = requestAnimationFrame(frameLoop)
    }

    frameId = requestAnimationFrame(frameLoop)

    return () => cancelAnimationFrame(frameId)
  }
}
