import type { TStoreLoaderData } from '@/services/store/loader'

export const loaderDefaultData = {
  once: false,
  loaded: 0,
  status: 'idle',
} satisfies TStoreLoaderData
