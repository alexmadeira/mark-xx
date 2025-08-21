//
//
//

export type TUDelayWait = number
export type TUDelayCallbackFunction = (...args: unknown[]) => void | Promise<void>

export type TUDelayProps<T extends unknown[]> = [TUDelayCallbackFunction, TUDelayWait, ...T]
export type TUIntervalProps<T extends unknown[]> = [TUDelayCallbackFunction, TUDelayWait, ...T]

export type TTimer = {
  cancel(): void
}

export interface ITimer {
  delay<T extends unknown[]>(...[fn, wait, ...args]: TUDelayProps<T>): TTimer
  interval<T extends unknown[]>(...[fn, wait, ...args]: TUIntervalProps<T>): TTimer
}
