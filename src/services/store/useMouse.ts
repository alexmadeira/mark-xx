import type { TStoreMouse } from '@/services/store/mouse'

import { produce } from 'immer'
import { create } from 'zustand'

import { mouseDefaultData } from './_defaults/mouse'

export const useMouse = create<TStoreMouse>((set) => ({
  data: mouseDefaultData,
  actions: {
    setDocumentPosition: (position) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.document = position
        }),
      ),
    setElementPosition: (name, position) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.elements[name] = position
        }),
      ),
  },
}))
