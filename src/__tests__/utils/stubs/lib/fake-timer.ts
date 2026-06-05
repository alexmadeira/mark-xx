import type { ITimer } from '@/services/utils/timer'

export function makeFakeTimer() {
  const delayCancel = vi.fn()
  const intervalCancel = vi.fn()

  const timer = {
    debounce: vi.fn(),
    delay: vi.fn((_callback: () => void) => delayCancel),
    interval: vi.fn((_callback: () => void) => intervalCancel),
    raf: vi.fn(),
    throttle: vi.fn((_name: string, callback: (event: Event) => void, _delay: number, event: Event) => {
      callback(event)
    }),
  }

  return {
    delayCancel,
    intervalCancel,
    timer: timer as unknown as ITimer,
    timerSpy: timer,
  }
}
