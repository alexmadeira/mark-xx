class FakeElementStore {
  public data = {
    hero: {
      measure: {
        height: 100,
        width: 200,
      },
    },
  }

  private readonly addElementSpy = vi.fn()
  private readonly setClassNameSpy = vi.fn()
  private readonly setMeasureSpy = vi.fn((_name: string, measure: Record<string, number>) => {
    this.data.hero.measure = {
      ...this.data.hero.measure,
      ...measure,
    }
  })

  public reset() {
    this.data.hero.measure = {
      height: 100,
      width: 200,
    }
  }

  public get actions() {
    return {
      addElement: this.addElementSpy,
      setClassName: this.setClassNameSpy,
      setMeasure: this.setMeasureSpy,
    }
  }
}

export const fakeElementStore = new FakeElementStore()
