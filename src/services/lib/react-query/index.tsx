import { QueryClient } from '@tanstack/react-query'

import { env } from '~/env'

import { IDBPersister } from './persister/idb-persister'
import { LocalStoragePersister } from './persister/local-storage-persister'

const Persister = env.MODE !== 'development' ? LocalStoragePersister : IDBPersister

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: env.VITE_QUERY_CLIENT_STALE_TIME,
      gcTime: env.VITE_QUERY_GC_TIME,
    },
  },
})

export const persister = Persister.create({
  storageKey: env.VITE_STORAGE_KEY,
})
