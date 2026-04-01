import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherNetwork, TStoreFetcherNetworksData } from '@/services/store/fetcher-networks'

export class FakeFetcherNetworksStore {
  public readonly data: TStoreFetcherNetworksData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherNetworksData> = {}) {
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

  private setList(brands: TStoreFetcherNetwork[]) {
    this.data.list = [...this.data.list, ...brands]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
