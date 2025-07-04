import type { TStoreOverlap } from '@/services/store/overlap'

import { produce } from 'immer'
import { create } from 'zustand'

import { overlapDefaultData } from './_defaults/overlap'

export const useOverlap = create<TStoreOverlap>((set) => ({
  data: overlapDefaultData,
  actions: {
    setCollision: (target, option) =>
      set((state) =>
        produce(state, (draft) => {
          // if (!option) {
          //   delete draft.data.collision[target]
          //   return
          // }
          draft.data.collision[target] = option
        }),
      ),
  },
}))
