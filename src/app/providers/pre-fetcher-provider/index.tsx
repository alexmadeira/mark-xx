import type { TPreFetcherProviderProps } from '@/providers/pre-fetcher'

import { BackgroundFetcher } from '_APP/providers/pre-fetcher-provider/background-fetcher.tsx'
import { PreFetcher } from '_APP/providers/pre-fetcher-provider/pre-fetcher.tsx'

export function PreFetcherProvider({ children }: TPreFetcherProviderProps) {
  return (
    <>
      <PreFetcher />
      <BackgroundFetcher />
      {children}
    </>
  )
}
