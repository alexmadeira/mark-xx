export type TTimerCancel = () => void
export type TTimerTimeFunction = (time: number) => void
export type TTimerFunction = (...args: never[]) => unknown

export type TTimerRafProps = [fn: TTimerTimeFunction]
export type TTimerDelayProps<T extends TTimerFunction> = [fn: T, wait?: number, ...args: Parameters<T>]
export type TTimerIntervalProps<T extends TTimerFunction> = [fn: T, wait: number, ...args: Parameters<T>]
export type TTimerDebounceProps<T extends TTimerFunction> = [key: string, fn: T, wait: number, ...args: Parameters<T>]
export type TTimerThrottleProps<T extends TTimerFunction> = [key: string, fn: T, wait: number, ...args: Parameters<T>]

export interface ITimer {
  raf: (...props: TTimerRafProps) => TTimerCancel
  delay: <T extends TTimerFunction>(...props: TTimerDelayProps<T>) => TTimerCancel
  interval: <T extends TTimerFunction>(...props: TTimerIntervalProps<T>) => TTimerCancel
  debounce: <T extends TTimerFunction>(...props: TTimerDebounceProps<T>) => TTimerCancel
  throttle: <T extends TTimerFunction>(...props: TTimerThrottleProps<T>) => void
}
