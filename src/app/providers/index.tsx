import type { TProviderProps } from '@/providers'

import { HelmetProvider } from './helmet-provider'
import { MainProvider } from './main-provider'
import { PreFetcherProvider } from './pre-fetcher-provider'
import { QueryClientProvider } from './query-client-provider'

export function Provider({ children, ...props }: TProviderProps) {
  return (
    <QueryClientProvider {...props.queryClientProps}>
      <PreFetcherProvider>
        <HelmetProvider {...props.helmetProps}>
          <MainProvider>{children}</MainProvider>
        </HelmetProvider>
      </PreFetcherProvider>
    </QueryClientProvider>
  )
}
