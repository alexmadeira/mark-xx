import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherAward, TStoreFetcherAwardsData } from '@/services/store/fetcher-awards'

export class FakeFetcherAwardsStore {
  public readonly data: TStoreFetcherAwardsData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherAwardsData> = {}) {
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

  private setList(awards: TStoreFetcherAward[]) {
    this.data.list = [...this.data.list, ...awards]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
