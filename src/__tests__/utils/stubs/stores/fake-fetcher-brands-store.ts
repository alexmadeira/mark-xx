import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherBrand, TStoreFetcherBrandsData } from '@/services/store/fetcher-brands'

export class FakeFetcherBrandsStore {
  public readonly data: TStoreFetcherBrandsData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherBrandsData> = {}) {
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

  private setList(brands: TStoreFetcherBrand[]) {
    this.data.list = [...this.data.list, ...brands]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
