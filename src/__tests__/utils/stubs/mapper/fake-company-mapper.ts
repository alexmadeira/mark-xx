import type { TCompanyRaw } from '_TEST/utils/factories/fetcher/make-company-raw'
import type { ICompanyMapper } from '@/interfaces/mapper/company'

import _ from 'lodash'

export class CompanyMapperMock implements ICompanyMapper {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TCompanyRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TCompanyRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      role: raw.data.role,
      name: data.data.name,
      description: raw.data.description,
      start: raw.data.date.start,
      end: raw.data.date.end,
    }
  }

  public set override(data: Partial<TCompanyRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
