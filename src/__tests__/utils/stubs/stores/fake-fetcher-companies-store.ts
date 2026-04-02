import type { TEFetcherStatus } from '@/enums/fetcher'
import type { TStoreFetcherCompaniesData, TStoreFetcherCompany } from '@/services/store/fetcher-companies'

export class FakeFetcherCompaniesStore {
  public readonly data: TStoreFetcherCompaniesData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherCompaniesData> = {}) {
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

  private setList(companies: TStoreFetcherCompany[]) {
    this.data.list = [...this.data.list, ...companies]
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
