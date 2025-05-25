import type { TStoreScrolling } from '@/services/store/scrolling'

import { produce } from 'immer'
import { create } from 'zustand'

import { scrollingDefaultData } from './_defaults/scrolling'

export const useScrolling = create<TStoreScrolling>((set) => ({
  data: scrollingDefaultData,
  actions: {
    setDetails: (details) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.details = details
        }),
      ),
  },
}))
