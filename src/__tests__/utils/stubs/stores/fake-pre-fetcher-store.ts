import type { TPreFetcherMapped } from '_TEST/utils/stubs/mapper/fake-pre-fetcher-mapper'

export class FakePreFetcherStore {
  public readonly data: Record<string, TPreFetcherMapped[]>

  private readonly setListSpy: ReturnType<typeof vi.fn>

  constructor(initialState: Record<string, TPreFetcherMapped[]> = {}) {
    this.data = initialState
    this.setListSpy = vi.fn(this.setList.bind(this))
  }

  private setList(key: string, list: TPreFetcherMapped[]) {
    this.data[key] = [...list]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
    }
  }
}
