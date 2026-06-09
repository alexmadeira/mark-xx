import type { TStoreActivityStatus } from '@/services/store/activity'

type FakeActivityMonitor = {
  events: string[]
  status: TStoreActivityStatus
  timeout: number
}

class FakeActivityStore {
  public data = {
    monitors: {} as Record<string, FakeActivityMonitor>,
  }

  private readonly setMonitorSpy = vi.fn((name: string, monitor: FakeActivityMonitor) => {
    this.data.monitors[name] = monitor
  })

  private readonly setStatusSpy = vi.fn((name: string, status: TStoreActivityStatus) => {
    this.data.monitors[name].status = status
  })

  public reset() {
    this.data.monitors = {}
  }

  public get actions() {
    return {
      setMonitor: this.setMonitorSpy,
      setStatus: this.setStatusSpy,
    }
  }
}

export const fakeActivityStore = new FakeActivityStore()
