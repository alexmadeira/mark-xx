import type { TEPageStatus } from '@/enums/page'
import type { TEPrismicPageType } from '@/enums/prismic'
import type { TStoreFetcherPagesAnyData, TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

export class FakeFetcherPagesStore {
  public readonly data: TStoreFetcherPagesData

  private readonly setPageSpy: ReturnType<typeof vi.fn>
  private readonly setPageStatusSpy: ReturnType<typeof vi.fn>

  constructor(props: Partial<TStoreFetcherPagesData> = {}) {
    const fallbackPageData = {
      id: 'not-set',
      slug: 'not-set',
      title: 'not-set',
      status: 'idle',
      description: '<p>not-set</p>',
      quote: null,
      subTitle: null,
      movie: '',
      awardsTitle: '',
      awardsSubtitle: '',
      languagesTitle: '',
      languagesSubtitle: '',
      brandsTitle: '',
      brandsSubtitle: '',
    } satisfies TStoreFetcherPagesAnyData

    this.data = {
      about: props.about || fallbackPageData,
      home: props.home || fallbackPageData,
      projects: props.projects || fallbackPageData,
    }

    this.setPageSpy = vi.fn(this.setPage.bind(this))
    this.setPageStatusSpy = vi.fn(this.setPageStatus.bind(this))
  }

  private setPage(name: TEPrismicPageType, content: TStoreFetcherPagesAnyData) {
    if (name === 'about') this.data.about = content as TStoreFetcherPagesData['about']
    if (name === 'home') this.data.home = content as TStoreFetcherPagesData['home']
    if (name === 'projects') this.data.projects = content as TStoreFetcherPagesData['projects']
  }

  private setPageStatus(name: TEPrismicPageType, status: TEPageStatus) {
    if (name === 'about') this.data.about.status = status
    if (name === 'home') this.data.home.status = status
    if (name === 'projects') this.data.projects.status = status
  }

  public get actions() {
    return {
      setPage: this.setPageSpy,
      setPageStatus: this.setPageStatusSpy,
    }
  }
}
