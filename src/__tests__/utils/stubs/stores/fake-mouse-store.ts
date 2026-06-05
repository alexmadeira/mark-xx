class FakeMouseStore {
  public readonly actions = {
    setDocumentPosition: vi.fn(),
    setElementPosition: vi.fn(),
  }
}

export const fakeMouseStore = new FakeMouseStore()
