import type { TStoreFetcherAwards } from '@/services/store/fetcher-awards'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherAwardsDefaultData } from './_defaults/fetcher-awards'

export const useFetcherAwards = create<TStoreFetcherAwards>((set) => ({
  data: fetcherAwardsDefaultData,
  actions: {
    setList: (awards) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list = awards
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
