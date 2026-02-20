export type TTimerCancel = () => void
export type TTimerCallbackFunction = (...args: unknown[]) => void | Promise<void>

export type TTimerDelayProps<T extends unknown[]> = [fn: TTimerCallbackFunction, wait: number, ...args: T]
export type TTimerIntervalProps<T extends unknown[]> = [fn: TTimerCallbackFunction, wait: number, ...args: T]

export interface ITimer {
  delay: <T extends unknown[]>(...props: TTimerDelayProps<T>) => TTimerCancel
  interval: <T extends unknown[]>(...props: TTimerIntervalProps<T>) => TTimerCancel
}
