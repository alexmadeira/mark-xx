import type { TStoreElement } from '@/services/store/element'

import { produce } from 'immer'
import { create } from 'zustand'

import { elementDefaultData, elementDefaultProps } from './_defaults/element'

export const useElement = create<TStoreElement>((set) => ({
  data: elementDefaultData,
  actions: {
    addElement: (name) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data[name]) return
          draft.data[name] = elementDefaultProps
        }),
      ),
    setMeasure: (name, measure) =>
      set((state) =>
        produce(state, (draft) => {
          Object.assign(draft.data[name].measure, measure)
        }),
      ),
    setClassName: (name, className) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data[name].className = className
        }),
      ),
  },
}))
