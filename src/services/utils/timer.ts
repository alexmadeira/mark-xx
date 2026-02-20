import type { ITimer, TTimerDelayProps, TTimerIntervalProps } from '@/services/utils/timer'

export class Timer implements ITimer {
  public delay<T extends unknown[]>(...[fn, wait, ...args]: TTimerDelayProps<T>) {
    const timeoutId = setTimeout(() => fn(...args), wait)
    return () => clearTimeout(timeoutId)
  }

  public interval<T extends unknown[]>(...[fn, wait, ...args]: TTimerIntervalProps<T>) {
    const intervalId = setInterval(() => fn(...args), wait)
    return () => clearInterval(intervalId)
  }
}
