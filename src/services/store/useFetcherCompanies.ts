import type { TStoreFetcherCompanies } from '@/services/store/fetcher-companies'

import { produce } from 'immer'
import { create } from 'zustand'

import { fetcherCompaniesDefaultData } from './_defaults/fetcher-companies'

export const useFetcherCompanies = create<TStoreFetcherCompanies>((set) => ({
  data: fetcherCompaniesDefaultData,
  actions: {
    setList: (companies) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list = companies
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
