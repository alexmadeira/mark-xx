import type { TStoreElement } from '@/services/store/element'

import { produce } from 'immer'
import { create } from 'zustand'

import { elementDefaultData } from './_defaults/element'

export const useElement = create<TStoreElement>((set) => ({
  data: elementDefaultData,
  actions: {
    setBlock: (blockName, props) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data[blockName] = {
            ...elementDefaultData[blockName],
            ...state.data[blockName],
            ...props,
          }
        }),
      ),
  },
}))
