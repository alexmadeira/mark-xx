import type { TRepositoryRaw } from '_TEST/utils/factories/fetcher/make-repository-raw'
import type { IRepositoryMapper } from '@/interfaces/mapper/repository'

import _ from 'lodash'

export class RepositoryMapperMock implements IRepositoryMapper {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TRepositoryRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TRepositoryRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      name: data.name,
      size: data.size,
      owner: data.owner,
      private: data.private,
      language: data.language,
      pushedAt: data.pushedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  public set override(data: Partial<TRepositoryRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
