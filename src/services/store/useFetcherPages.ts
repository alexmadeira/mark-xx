import type { TStoreFetcherPages } from '@/services/store/fetcher-pages'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherPagesDefaultData } from './_defaults/fetcher-pages'

export const useFetcherPages = create<TStoreFetcherPages>((set) => ({
  data: fetcherPagesDefaultData,
  actions: {
    setPageStatus: (name, status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data[name].status === 'loaded') return
          draft.data[name].status = status
        }),
      ),
    setPage: (name, content) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data[name], content)) return
          Object.assign(draft.data[name], _.cloneDeep(content))
        }),
      ),
  },
}))
