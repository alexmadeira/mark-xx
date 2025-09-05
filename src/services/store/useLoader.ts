import type { TStoreLoader } from '@/services/store/loader'

import { produce } from 'immer'
import { create } from 'zustand'

import { loaderDefaultData } from './_defaults/loader'

export const useLoader = create<TStoreLoader>((set) => ({
  data: loaderDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.status = status
        }),
      ),
    setLoaded: (loaded) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.loaded = loaded
        }),
      ),
  },
}))
