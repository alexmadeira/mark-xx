import type { TNetworkRaw } from '_TEST/utils/factories/fetcher/make-network-raw'
import type { INetworkMapper } from '@/interfaces/mapper/network'

import _ from 'lodash'

export class NetworkMapperMock implements INetworkMapper {
  private readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TNetworkRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TNetworkRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      tags: this.overrideData.tags || raw.tags,
      name: data.data.network_name,
      path: data.data.network_path,
      type: data.data.network_type,
      icon: data.data.network_icon,
    }
  }

  public set override(data: Partial<TNetworkRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
