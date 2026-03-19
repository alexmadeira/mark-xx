import type { TStoreActivity } from '@/services/store/activity'

import { current, produce } from 'immer'
import { create } from 'zustand'

import { activityDefaultData } from './_defaults/activity'

export const useActivity = create<TStoreActivity>((set) => ({
  data: activityDefaultData,
  actions: {
    setMonitor: (name, monitor) =>
      set((state) =>
        produce(state, (draft) => {
          if (current(draft.data.monitors)[name]) return

          draft.data.monitors[name] = monitor
        }),
      ),

    setStatus: (name, status) =>
      set((state) =>
        produce(state, (draft) => {
          if (!current(draft.data.monitors[name])) return

          draft.data.monitors[name].status = status
        }),
      ),
  },
}))
