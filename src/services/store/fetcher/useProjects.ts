import type { TStoreProjects } from '@/services/store/fetcher/projects'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { projectsDefaultData } from './_defaults/scrolling'

export const useProjects = create<TStoreProjects>((set) => ({
  data: projectsDefaultData,
  actions: {
    setList: (name, projects) =>
      set((state) =>
        produce(state, (draft) => {
          // if (!draft.data.list[name]) draft.data.list[name] = []

          draft.data.list[name] = projects
          // _.set(draft.data.list, [name], projects)
        }),
      ),
  },
}))
