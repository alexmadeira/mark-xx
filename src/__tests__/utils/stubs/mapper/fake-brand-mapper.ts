import type { TBrandRaw } from '_TEST/utils/factories/fetcher/make-brand-raw'

import _ from 'lodash'

export class BrandMapperMock {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TBrandRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TBrandRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      name: data.data.name,
      logo: data.data.logo,
    }
  }

  public set override(data: Partial<TBrandRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
