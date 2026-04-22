import type { TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

const fallbackBasePageData = {
  id: 'not-set',
  slug: 'not-set',
  title: 'not-set',
  status: 'idle',
  description: '<p>not-set</p>',
  quote: null,
  subTitle: null,
} as const

const fallbackHomePageData = {
  ...fallbackBasePageData,
  type: 'home',
} satisfies TStoreFetcherPagesData['home']

const fallbackProjectsPageData = {
  ...fallbackBasePageData,
  type: 'projects',
} satisfies TStoreFetcherPagesData['projects']

const fallbackAboutPageData = {
  ...fallbackBasePageData,
  type: 'about',
  movie: '',
  awardsTitle: '',
  awardsSubtitle: '',
  languagesTitle: '',
  languagesSubtitle: '',
  brandsTitle: '',
  brandsSubtitle: '',
} satisfies TStoreFetcherPagesData['about']

export class FakeFetcherPagesStore {
  public readonly data: TStoreFetcherPagesData

  private readonly setPageSpy: ReturnType<typeof vi.fn>
  private readonly setPageStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherPagesData> = {}) {
    this.data = {
      about: props.about || fallbackAboutPageData,
      home: props.home || fallbackHomePageData,
      projects: props.projects || fallbackProjectsPageData,
    }

    this.setPageSpy = vi.fn(this.setPage.bind(this))
    this.setPageStatusSpy = vi.fn(this.setPageStatus.bind(this))
  }

  private setPage<TKey extends keyof TStoreFetcherPagesData>(name: TKey, content: TStoreFetcherPagesData[TKey]) {
    this.data[name] = content
  }

  private setPageStatus<TKey extends keyof TStoreFetcherPagesData>(
    name: TKey,
    status: TStoreFetcherPagesData[TKey]['status'],
  ) {
    this.data[name].status = status
  }

  public get actions() {
    return {
      setPage: this.setPageSpy,
      setPageStatus: this.setPageStatusSpy,
    }
  }
}
