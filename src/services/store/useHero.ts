import type { TStoreHero } from '@/services/store/hero'

import { produce } from 'immer'
import { create } from 'zustand'

import { heroDefaultData } from './_defaults/hero'

export const useHero = create<TStoreHero>((set) => ({
  data: heroDefaultData,
  actions: {
    setCurrent: (content, props) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.current.id !== props.id) Object.assign(draft.data.current, props)
          if (state.data.current.content !== content) draft.data.current.content = content
        }),
      ),
  },
}))
