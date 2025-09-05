import type { TProviderProps } from '@/providers'

import { HelmetProvider } from './helmet-provider'
import { PreFetcherProvider } from './pre-fetcher-provider'
import { QueryClientProvider } from './query-client-provider'

export function Provider({ children, ...props }: TProviderProps) {
  return (
    <QueryClientProvider {...props.queryClientProps}>
      <HelmetProvider {...props.helmetProps}>
        <PreFetcherProvider>{children}</PreFetcherProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}
