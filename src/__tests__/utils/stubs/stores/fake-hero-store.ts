class FakeHeroStore {
  public readonly actions = {
    setColor: vi.fn(),
    setCurrent: vi.fn(),
    setTyping: vi.fn(),
  }
}

export const fakeHeroStore = new FakeHeroStore()
