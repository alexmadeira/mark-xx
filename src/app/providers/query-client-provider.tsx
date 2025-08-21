import type { TQueryClientProviderProps } from '@/providers/query-client'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { persister, queryClient } from '_SRV/lib'

export function QueryClientProvider(props: TQueryClientProviderProps) {
  return <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }} {...props} />
}
