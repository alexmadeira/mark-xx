import type { ITimer, TUDelayProps } from '@/services/utils/timer'

import _ from 'lodash'

export type * from '@/services/utils/timer'

function interval<T extends unknown[]>(...[fn, wait, ...args]: TUDelayProps<T>) {
  const intervalId = setInterval(() => fn(...args), wait)

  return {
    cancel: () => clearInterval(intervalId),
  }
}

function delay<T extends unknown[]>(...[fn, wait, ...args]: TUDelayProps<T>) {
  const timeoutId = setTimeout(() => fn(...args), wait)

  return {
    cancel: () => clearTimeout(timeoutId),
  }
}

export const timer: ITimer = Object.freeze({
  delay,
  interval,
})
