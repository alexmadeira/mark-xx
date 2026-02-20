import type { TStoreFetcherTechnologies } from '@/services/store/fetcher-technologies'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherTechnologiesDefaultData } from './_defaults/fetcher-technologies'

export const useFetcherTechnologies = create<TStoreFetcherTechnologies>((set) => ({
  data: fetcherTechnologiesDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return
          draft.data.status = status
        }),
      ),
    setList: (technologies) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, technologies)) return
          draft.data.list = technologies
        }),
      ),
  },
}))
