import type { TStoreFetcherUsageLanguages } from '@/services/store/fetcher-usage-languages'

import { produce } from 'immer'
import { create } from 'zustand'

import { fetcherUsageLanguagesDefaultData } from './_defaults/fetcher-usage-languages'

export const useFetcherUsageLanguages = create<TStoreFetcherUsageLanguages>((set) => ({
  data: fetcherUsageLanguagesDefaultData,
  actions: {
    setList: (languages) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list = languages
        }),
      ),
    setTotal: (total) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.total = total
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
