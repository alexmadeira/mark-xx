import type { TStorePageConfigs } from '@/services/store/page-configs'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { pageConfigsDefaultData } from './_defaults/fetcher-page-configs'

export const usePageConfigs = create<TStorePageConfigs>((set) => ({
  data: pageConfigsDefaultData,
  actions: {
    setPageConfig: (config) =>
      set((state) =>
        produce(state, (draft) => {
          if (!config.path) return
          draft.data.list[config.path] = config
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
