import type { TPageRaw } from '_TEST/utils/factories/fetcher/make-page-raw'
import type { IPageMapper } from '@/interfaces/mapper/page'

import _ from 'lodash'

export class PageMapperMock implements IPageMapper {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>
  public readonly configSpy: ReturnType<typeof vi.fn>

  constructor(private overrideData: Partial<TPageRaw> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
    this.configSpy = vi.fn(this.handleConfig.bind(this))
  }

  private handleToStore(raw: TPageRaw) {
    const data = _.merge(raw, this.overrideData)

    return {
      id: data.id,
      slug: data.uid,
      title: data.data.title,
      status: 'loaded' as const,
      description: '<p>page description</p>',
      quote: 'page quote',
      subTitle: 'page subtitle',
    }
  }

  private handleConfig() {
    return {
      key: '/about',
      canonical: 'https://example.com/about',
      background: '#111111',
      meta: {
        seo: {
          title: 'SEO title',
          description: 'SEO description',
        },
        twitter: {
          card: 'summary_large_image' as const,
          title: 'Twitter title',
          description: 'Twitter description',
          image: 'https://example.com/twitter.png',
        },
        openGraph: {
          type: 'website' as const,
          title: 'OG title',
          description: 'OG description',
          image: 'https://example.com/og.png',
        },
      },
    }
  }

  public set override(data: Partial<TPageRaw>) {
    this.overrideData = data
  }

  public get toStore() {
    return this.toStoreSpy
  }

  public get config() {
    return this.configSpy
  }
}
