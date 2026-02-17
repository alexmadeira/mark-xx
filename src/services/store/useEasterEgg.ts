import type { TStoreEasterEgg } from '@/services/store/easter-egg'

import { produce } from 'immer'
import { create } from 'zustand'

import { easterEggDefaultData, easterEggDefaultProps } from './_defaults/easter-egg'

export const useEasterEgg = create<TStoreEasterEgg>((set) => ({
  data: easterEggDefaultData,
  actions: {
    setEgg: (name) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.eggs[name]) return
          draft.data.eggs[name] = easterEggDefaultProps
        }),
      ),
    setStatus: (name, status) =>
      set((state) =>
        produce(state, (draft) => {
          if (!state.data.eggs[name]) return
          if (state.data.eggs[name].status === status) return

          draft.data.eggs[name].status = status
          draft.data.eggs[name].called += 1
        }),
      ),
    call: (name) =>
      set((state) =>
        produce(state, (draft) => {
          if (!state.data.eggs[name]) return

          draft.data.eggs[name].called += 1
          draft.data.eggs[name].status = 'called'
        }),
      ),
    read: (name) =>
      set((state) =>
        produce(state, (draft) => {
          if (!state.data.eggs[name]) return

          draft.data.eggs[name].status = 'read'
        }),
      ),
    destroy: () =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.eggs = {}
        }),
      ),
  },
}))
