import type { TEFetcherStatus } from '@/enums/fetcher'
import type {
  TStoreFetcherRepositoryLanguage,
  TStoreFetcherRepositoryLanguagesData,
} from '@/services/store/fetcher-repository-languages'

export class FakeFetcherRepositoryLanguagesStore {
  public readonly data: TStoreFetcherRepositoryLanguagesData

  private readonly setListSpy: ReturnType<typeof vi.fn>
  private readonly setStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherRepositoryLanguagesData> = {}) {
    this.data = {
      list: props.list || {},
      status: props.status || 'idle',
      totalUsage: props.totalUsage || 0,
      languageUsage: props.languageUsage || [],
    }

    this.setListSpy = vi.fn(this.setList.bind(this))
    this.setStatusSpy = vi.fn(this.setStatus.bind(this))
  }

  private setStatus(status: TEFetcherStatus) {
    this.data.status = status
  }

  private setList(repository: string, languages: TStoreFetcherRepositoryLanguage[]) {
    this.data.list[repository] = languages
  }

  public get actions() {
    return {
      setList: this.setListSpy,
      setStatus: this.setStatusSpy,
    }
  }
}
