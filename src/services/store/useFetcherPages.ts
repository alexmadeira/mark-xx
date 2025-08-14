import type { TStoreFetcherPages } from '@/services/store/fetcher-pages'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherPagesDefaultData, fetcherPagesDefaultPageContant } from './_defaults/fetcher-page'

export const useFetcherPages = create<TStoreFetcherPages>((set) => ({
  data: fetcherPagesDefaultData,
  actions: {
    createPage: (name) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data[name]) return

          _.set(draft.data, [name], fetcherPagesDefaultPageContant)
          _.set(draft.data, [name, 'status'], 'idle')
        }),
      ),
    setPageStatus: (name, status) =>
      set((state) =>
        produce(state, (draft) => {
          _.set(draft.data, [name, 'status'], status)
        }),
      ),
    setPage: (name, content) =>
      set((state) =>
        produce(state, (draft) => {
          if (!state.data[name]) throw new Error('Page not found')

          draft.data[name] = { ...state.data[name], ...content }
        }),
      ),
  },
}))
