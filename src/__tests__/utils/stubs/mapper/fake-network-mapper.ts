import type { TNetworkRaw } from '_TEST/utils/factories/fetcher/make-network-raw'

import _ from 'lodash'

export class NetworkMapperMock {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TNetworkRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TNetworkRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      tags: this.overrideData.tags || raw.tags,
      name: data.data.name,
      path: data.data.path,
      type: data.data.type,
      icon: data.data.icon,
    }
  }

  public set override(data: Partial<TNetworkRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
