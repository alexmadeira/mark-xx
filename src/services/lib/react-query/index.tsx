import { QueryClient } from '@tanstack/react-query'

import { useRequester } from '_STR/useRequester'

import { env } from '~/env'

import { IDBPersister } from './persister/idb-persister'
import { InMemoryPersister } from './persister/in-memory-persister'

const Persister = env.MODE !== 'development' ? IDBPersister : InMemoryPersister

const persisterStorageVersion = `${env.BUILD_VERSIO}.${env.PACKAGE_VERSION}`

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: env.VITE_QUERY_CLIENT_STALE_TIME,
      gcTime: env.VITE_QUERY_GC_TIME,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
})

export const persister = Persister.create(
  {
    storageKey: env.VITE_STORAGE_KEY,
    version: persisterStorageVersion,
  },
  useRequester.getState().actions,
)
