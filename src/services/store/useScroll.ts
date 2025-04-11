import type { TStoreScroll } from '@/services/store/scroll'

import { produce } from 'immer'
import { create } from 'zustand'

import { scrollDefaultData } from './_defaults/scroll'

export const useScroll = create<TStoreScroll>((set) => ({
  data: scrollDefaultData,
  actions: {
    setDetails: (details) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.details = details
        }),
      ),
  },
}))
