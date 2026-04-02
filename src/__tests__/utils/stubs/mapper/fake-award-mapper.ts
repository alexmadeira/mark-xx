import type { TAwardRaw } from '_TEST/utils/factories/fetcher/make-award-raw'
import type { IAwardMapper } from '@/interfaces/mapper/award'

import _ from 'lodash'

import { AwardType } from '_SRV/parser/award-type'

export class AwardMapperMock implements IAwardMapper {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TAwardRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TAwardRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      by: data.data.by,
      name: data.data.name,
      date: data.data.date,
      type: new AwardType(data.data.type),
      description: data.data.description,
    }
  }

  public set override(data: Partial<TAwardRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
