import type { TTechnologyRaw } from '_TEST/utils/factories/fetcher/make-technology-raw'
import type { ITechnologyMapper } from '@/interfaces/mapper/technology'

import _ from 'lodash'

export class TechnologyMapperMock implements ITechnologyMapper {
  private readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TTechnologyRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TTechnologyRaw) {
    const data = _.merge(raw, this.overrideData)
    const banner = typeof data.data.banner === 'string' ? data.data.banner : data.data.banner?.url

    return {
      id: data.id,
      name: data.data.name,
      type: data.data.type,
      color: data.data.color,
      banner,
    }
  }

  public set override(data: Partial<TTechnologyRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
