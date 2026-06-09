class FakeEasterEggStore {
  public data = {
    eggs: {} as Record<string, unknown>,
  }

  private readonly callSpy = vi.fn()
  private readonly readSpy = vi.fn()
  private readonly setEggSpy = vi.fn((name: string) => {
    this.data.eggs[name] = { status: 'not-called' }
  })

  public reset() {
    this.data.eggs = {}
  }

  public get actions() {
    return {
      call: this.callSpy,
      read: this.readSpy,
      setEgg: this.setEggSpy,
    }
  }
}

export const fakeEasterEggStore = new FakeEasterEggStore()
