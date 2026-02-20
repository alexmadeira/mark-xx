import type { TStoreFetcherNetworks } from '@/services/store/fetcher-networks'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherNetworksDefaultData } from './_defaults/fetcher-networks'

export const useFetcherNetworks = create<TStoreFetcherNetworks>((set) => ({
  data: fetcherNetworksDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return
          draft.data.status = status
        }),
      ),
    setList: (Networks) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, Networks)) return
          draft.data.list = Networks
        }),
      ),
  },
}))
