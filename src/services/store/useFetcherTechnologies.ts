import type { TStoreFetcherTechnologies } from '@/services/store/fetcher-technologies'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherTechnologiesDefaultData } from './_defaults/fetcher-technologies'

export const useFetcherTechnologies = create<TStoreFetcherTechnologies>((set) => ({
  data: fetcherTechnologiesDefaultData,
  actions: {
    setList: (technologies) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list = technologies
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
