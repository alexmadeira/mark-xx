export type TFetcherPrefetch = {
  tags: string[]
  name: string
  fetch: () => Promise<void>
}

export interface IFetcher<TOptions = unknown> {
  fetch: (name: string, options: TOptions) => Promise<void>
  prefetch: (name: string, options: TOptions) => TFetcherPrefetch
}
