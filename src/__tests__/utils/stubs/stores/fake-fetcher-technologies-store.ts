import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherTechnologiesData, TStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

export class FakeFetcherTechnologiesStore {
  public readonly data: TStoreFetcherTechnologiesData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherTechnologiesData> = {}) {
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

  private setList(technologies: TStoreFetcherTechnology[]) {
    this.data.list = [...this.data.list, ...technologies]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
