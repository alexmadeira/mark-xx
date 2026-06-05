class FakeRouteStore {
  public data = {
    current: '',
    params: {},
  }

  public readonly actions = {
    setCurrent: vi.fn(),
    setPageReady: vi.fn(),
    setParams: vi.fn(),
  }

  public reset() {
    this.data.current = ''
    this.data.params = {}
  }
}

export const fakeRouteStore = new FakeRouteStore()
