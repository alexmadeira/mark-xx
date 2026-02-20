import type { TStoreFetcherRepositories } from '@/services/store/fetcher-repositories'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherRepositoriesDefaultData } from './_defaults/fetcher-repositories'

export const useFetcherRepositories = create<TStoreFetcherRepositories>((set) => ({
  data: fetcherRepositoriesDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.status === 'loaded') return
          draft.data.status = status
        }),
      ),
    setList: (repositories) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list, repositories)) return
          draft.data.list = repositories
        }),
      ),
  },
}))
