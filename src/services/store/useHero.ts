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
          draft.data.status.current = status
          switch (status) {
            case 'idle':
              draft.data.status.loaded = false
              draft.data.status.loading = false
              draft.data.status.error = false
              break
            case 'loaded':
              draft.data.status.loaded = true
              draft.data.status.loading = false
              draft.data.status.error = false
              break
            case 'loading':
              draft.data.status.loaded = false
              draft.data.status.loading = true
              draft.data.status.error = false
              break
            case 'error':
              draft.data.status.loaded = false
              draft.data.status.loading = false
              draft.data.status.error = true
              break
          }
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
