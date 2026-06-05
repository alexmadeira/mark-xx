class FakeOverlapStore {
  public readonly actions = {
    setCollision: vi.fn(),
  }
}

export const fakeOverlapStore = new FakeOverlapStore()
