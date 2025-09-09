import type { TStoreFetcherBrands } from '@/services/store/fetcher-brands'

import { produce } from 'immer'
import { create } from 'zustand'

import { fetcherBrandsDefaultData } from './_defaults/fetcher-brands'

export const useFetcherBrands = create<TStoreFetcherBrands>((set) => ({
  data: fetcherBrandsDefaultData,
  actions: {
    setList: (brands) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list = brands
        }),
      ),
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.status = status
        }),
      ),
  },
}))
