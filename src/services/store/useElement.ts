import type { TStoreElement } from '@/services/store/element'

import { produce } from 'immer'
import { create } from 'zustand'

import { elementDefaultData } from './_defaults/element'

export const useElement = create<TStoreElement>((set) => ({
  data: elementDefaultData,
  actions: {
    setBlock: (name, props) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data[name] = {
            ...elementDefaultData[name],
            ...state.data[name],
            ...props,
          }
        }),
      ),
  },
}))
