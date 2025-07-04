import type { TStoreRoute } from '@/services/store/route'

import { produce } from 'immer'
import { create } from 'zustand'

import { routeDefaultData } from './_defaults/route'

export const useRoute = create<TStoreRoute>((set) => ({
  data: routeDefaultData,
  actions: {
    setCurrent: (route) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.current = route
        }),
      ),
  },
}))
