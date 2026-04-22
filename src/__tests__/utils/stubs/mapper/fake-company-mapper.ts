import type { TCompanyRaw } from '_TEST/utils/factories/fetcher/make-company-raw'
import type { ICompanyMapper } from '@/interfaces/mapper/company'

import _ from 'lodash'

export class CompanyMapperMock implements ICompanyMapper {
  private readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TCompanyRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TCompanyRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      role: data.data.role,
      name: data.data.name,
      description: data.data.description.map((d) => d.text).join('\n'),
      start: new Date(data.data.start_date ?? Date.now()),
      end: data.data.end_date ? new Date(data.data.end_date) : undefined,
    }
  }

  public set override(data: Partial<TCompanyRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
