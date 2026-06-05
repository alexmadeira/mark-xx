class FakeScrollingStore {
  public readonly actions = {
    setDetails: vi.fn(),
  }
}

export const fakeScrollingStore = new FakeScrollingStore()
