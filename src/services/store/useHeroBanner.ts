import type { TStoreHeroBanner } from '@/services/store/hero-banner'

import { produce } from 'immer'
import { create } from 'zustand'

import { heroBannerDefaultData } from './_defaults/hero-banner'

export const useHeroBanner = create<TStoreHeroBanner>((set) => ({
  data: heroBannerDefaultData,
  actions: {
    setCurrent: (id) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.current = id
        }),
      ),
  },
}))
