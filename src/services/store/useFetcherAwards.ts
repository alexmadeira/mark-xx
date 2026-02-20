import type { TStoreFetcherAwards } from '@/services/store/fetcher-awards'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherAwardsDefaultData } from './_defaults/fetcher-awards'

export const useFetcherAwards = create<TStoreFetcherAwards>((set) => ({
  data: fetcherAwardsDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return
          draft.data.status = status
        }),
      ),
    setList: (awards) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, awards)) return
          draft.data.list = awards
        }),
      ),
  },
}))
