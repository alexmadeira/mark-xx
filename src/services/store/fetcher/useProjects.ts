import type { TStoreProjects } from '@/services/store/fetcher/projects'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { projectsDefaultData } from './_defaults/project'

export const useProjects = create<TStoreProjects>((set) => ({
  data: projectsDefaultData,
  actions: {
    setList: (name, projects) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list[name] = projects
        }),
      ),
  },
}))
