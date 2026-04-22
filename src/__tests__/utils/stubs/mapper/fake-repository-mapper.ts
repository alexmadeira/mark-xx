import type { TRepositoryRaw } from '_TEST/utils/factories/fetcher/make-repository-raw'
import type { IRepositoryMapper } from '@/interfaces/mapper/repository'

import _ from 'lodash'

export class RepositoryMapperMock implements IRepositoryMapper {
  private readonly toStoreSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TRepositoryRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
  }

  private handleToStore(raw: TRepositoryRaw) {
    const data = _.merge(raw, this.overrideData)
    const owner = typeof data.owner === 'string' ? data.owner : data.owner.login

    return {
      id: String(data.id),
      name: data.name,
      size: data.size,
      owner,
      private: !!data.private,
      language: data.language,
      pushedAt: data.pushed_at ? new Date(data.pushed_at) : undefined,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
    }
  }

  public set override(data: Partial<TRepositoryRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }
}
