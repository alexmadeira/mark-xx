import type { TStoreFetcherPages } from '@/services/store/fetcher-pages'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherPagesDefaultData } from './_defaults/fetcher-page'

export const useFetcherPages = create<TStoreFetcherPages>((set) => ({
  data: fetcherPagesDefaultData,
  actions: {
    setPageStatus: (name, status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data[name].status = status
        }),
      ),
    setPage: (name, content) =>
      set((state) =>
        produce(state, (draft) => {
          Object.assign(draft.data[name], _.cloneDeep(content))
        }),
      ),
  },
}))
