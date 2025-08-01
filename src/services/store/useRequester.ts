import type { TStoreRequester } from '@/services/store/requester'

import { produce } from 'immer'
import { create } from 'zustand'

import { requesterDefaultData } from './_defaults/requester'

export const useRequester = create<TStoreRequester>((set) => ({
  data: requesterDefaultData,
  actions: {
    setCacheStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.cache.restoreStatus = status
          switch (status) {
            case 'idle':
              draft.data.cache.restored = false
              draft.data.cache.empty = true
              break
            case 'restored':
              draft.data.cache.empty = false
              draft.data.cache.restored = true
              break
            case 'restoring':
              draft.data.cache.restored = false
              break
            case 'error':
              draft.data.cache.restored = false
              break
          }
        }),
      ),
  },
}))
