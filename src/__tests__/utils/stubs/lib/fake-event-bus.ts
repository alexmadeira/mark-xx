type EventHandler = (payload?: unknown) => void

export function createFakeEventBus() {
  const listeners = new Map<string, EventHandler>()

  return {
    listeners,
    on: vi.fn((event: string, callback: EventHandler) => {
      listeners.set(event, callback)
    }),
  }
}
