import type { TStoreHero } from '@/services/store/hero'

import { produce } from 'immer'
import { create } from 'zustand'

import { heroDefaultData } from './_defaults/hero'

export const useHero = create<TStoreHero>((set) => ({
  data: heroDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.status = status
        }),
      ),
    setCurrent: (typing, content) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.current.typing !== typing) draft.data.current.typing = typing
          if (state.data.current.content.id !== content.id) Object.assign(draft.data.current.content, content)
        }),
      ),
  },
}))
