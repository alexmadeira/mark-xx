import type { TStoreHero } from '@/services/store/hero'

import { produce } from 'immer'
import { create } from 'zustand'

import { heroDefaultData } from './_defaults/hero'

export const useHero = create<TStoreHero>((set) => ({
  data: heroDefaultData,
  actions: {
    setCurrent: (content) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.current = content
        }),
      ),
    setTyping: (typing) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.typing !== typing) draft.data.typing = typing
        }),
      ),
    setColor: (color) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.color = color
        }),
      ),
  },
}))
