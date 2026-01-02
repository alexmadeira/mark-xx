export type TFetcherPrefetch = {
  tags: string[]
  name: string
  fetch: () => Promise<void>
}

export interface IFetcher<TOptions, TName extends string = string> {
  fetch(name: TName, options: TOptions): Promise<void>
  prefetch(name: TName, options: TOptions): TFetcherPrefetch
}
