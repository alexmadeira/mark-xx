import type { TStoreFetcherCompanies } from '@/services/store/fetcher-companies'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherCompaniesDefaultData } from './_defaults/fetcher-companies'

export const useFetcherCompanies = create<TStoreFetcherCompanies>((set) => ({
  data: fetcherCompaniesDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return

          draft.data.status = status
        }),
      ),
    setList: (companies) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, companies)) return
          draft.data.list = companies
        }),
      ),
  },
}))
