import type { TStoreRequesterData } from '@/services/store/requester'

export const requesterDefaultData = {
  cache: {
    restoreStatus: 'idle',
    restored: false,
    empty: false,
  },
} satisfies TStoreRequesterData
