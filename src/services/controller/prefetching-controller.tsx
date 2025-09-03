import type {
  TPrefetchingFetcherKeyProps,
  TPrefetchingPrefetchList,
  TPrefetchingPrepareProps,
  TPrefetchingProps,
  TPrefetchingSetPrefetcherProps,
} from '@/services/controller/prefetching'

import _ from 'lodash'

export class PrefetchingController {
  private readonly prefetchList: TPrefetchingPrefetchList

  protected constructor(props: TPrefetchingProps) {
    this.prefetchList = new Map()

    this.setPrefetcher(props.prefetchers)
  }

  private fetcherKey(...[fetcher]: TPrefetchingFetcherKeyProps) {
    return `${fetcher.name}:${fetcher.tags.join('-')}`
  }

  private prepare(...[prefetchers]: TPrefetchingPrepareProps) {
    _.forEach(prefetchers, (prefetcher) => {
      this.prefetchList.set(this.fetcherKey(prefetcher), {
        ...prefetcher,
        status: 'pending',
      })
    })
  }

  public static create(props: TPrefetchingProps) {
    return new PrefetchingController(props)
  }

  private async fetching() {
    const pendingFetchers = [...this.prefetchList].filter(([, v]) => v.status === 'pending')

    await Promise.all(
      pendingFetchers.map(([, fetcher]) => {
        this.prefetchList.set(this.fetcherKey(fetcher), { ...fetcher, status: 'fetched' })
        return fetcher.fetch()
      }),
    )
  }

  public setPrefetcher(...[prefetchers]: TPrefetchingSetPrefetcherProps) {
    this.prepare(_.castArray(prefetchers))
    this.fetching()
  }
}
