import type {
  TPreFetcherFetcherKeyProps,
  TPreFetcherFetchProps,
  TPreFetcherPrefetchList,
  TPreFetcherPrepareProps,
  TPreFetcherSetBackgroundPrefetcherProps,
  TPreFetcherSetPrefetcherProps,
} from '@/services/fetcher/pre-fetcher'

import _ from 'lodash'

export class PreFetcher {
  private readonly prefetchList: TPreFetcherPrefetchList
  private readonly backgroundList: TPreFetcherPrefetchList

  constructor() {
    this.prefetchList = new Map()
    this.backgroundList = new Map()

    _.bindAll(this, ['fetcherKey', 'prepare', 'run', 'addPrefetcher', 'addBackgroundPrefetcher', 'fetch'])
  }

  private fetcherKey(...[fetcher]: TPreFetcherFetcherKeyProps) {
    return `${fetcher.name}:${fetcher.tags.join('-')}`
  }

  private prepare(...[prefetchers]: TPreFetcherPrepareProps) {
    _.forEach(prefetchers, (prefetcher) => {
      this.prefetchList.set(this.fetcherKey(prefetcher), {
        ...prefetcher,
        status: 'pending',
      })
    })
  }

  public async run() {
    const pendingFetchers = [...this.prefetchList].filter(([, v]) => v.status === 'pending')

    await Promise.all(
      pendingFetchers.map(([, fetcher]) => {
        this.prefetchList.set(this.fetcherKey(fetcher), { ...fetcher, status: 'fetched' })
        return fetcher.fetch()
      }),
    )
  }

  public addPrefetcher(...[prefetchers]: TPreFetcherSetPrefetcherProps) {
    this.prepare(_.castArray(prefetchers))
    this.run()
  }

  public addBackgroundPrefetcher(...[prefetchers]: TPreFetcherSetBackgroundPrefetcherProps) {
    _.forEach(_.castArray(prefetchers), (prefetcher) => {
      this.backgroundList.set(this.fetcherKey(prefetcher), {
        ...prefetcher,
        status: 'pending',
      })
    })
  }

  public runBackground() {
    for (const [key, value] of this.backgroundList) {
      this.prefetchList.set(key, value)
      this.backgroundList.delete(key)
    }
    this.run()
  }

  public fetch(...[prefetcher]: TPreFetcherFetchProps) {
    const fetcherKey = this.fetcherKey(prefetcher)
    const fetcher = this.prefetchList.get(fetcherKey)

    if (!fetcher) return prefetcher.fetch()
    if (fetcher.status === 'fetched') return

    this.addPrefetcher(prefetcher)
  }
}
