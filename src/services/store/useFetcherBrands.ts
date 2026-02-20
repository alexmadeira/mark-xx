import type { TStoreFetcherBrands } from '@/services/store/fetcher-brands'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherBrandsDefaultData } from './_defaults/fetcher-brands'

export const useFetcherBrands = create<TStoreFetcherBrands>((set) => ({
  data: fetcherBrandsDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return

          draft.data.status = status
        }),
      ),
    setList: (brands) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, brands)) return
          draft.data.list = brands
        }),
      ),
  },
}))
