import type { IFetcher, TFetcherPrefetch } from '@/interfaces/fetcher'

import _ from 'lodash'

export abstract class Fetcher<TFetcherProps> implements IFetcher<TFetcherProps> {
  constructor() {
    _.bindAll(this, ['fetch', 'refetch', 'prefetch'])
  }

  protected refetch(name: string, options: TFetcherProps) {
    window.addEventListener('focus', () => this.fetch(name, options))
  }

  abstract prefetch(name: string, options: TFetcherProps): TFetcherPrefetch
  abstract fetch(name: string, options: TFetcherProps): Promise<void>
}
