import type { TPreFetcherRaw } from '_TEST/utils/factories/fetcher/make-pre-fetcher-raw'

export type TPreFetcherMapped = {
  name: string
  tags: string[]
}

export class PreFetcherMapperMock {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor() {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TPreFetcherRaw): TPreFetcherMapped {
    return {
      name: raw.name,
      tags: raw.tags,
    }
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
