import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherRepositoriesData, TStoreFetcherRepository } from '@/services/store/fetcher-repositories'

export class FakeFetcherRepositoriesStore {
  public readonly data: TStoreFetcherRepositoriesData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherRepositoriesData> = {}) {
    this.data = {
      list: props.list || [],
      status: props.status || 'idle',
    }

    this.setListSpy = vi.fn(this.setList.bind(this))
    this.setStatusSpy = vi.fn(this.setStatus.bind(this))
  }

  private setStatus(status: TEFetcherStatus) {
    this.data.status = status
  }

  private setList(repositories: TStoreFetcherRepository[]) {
    this.data.list = [...this.data.list, ...repositories]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
