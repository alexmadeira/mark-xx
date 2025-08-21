import type { TStoreFetcherProjects } from '@/services/store/fetcher-projects'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherProjectsDefaultData } from './_defaults/fetcher-project'

export const useFetcherProjects = create<TStoreFetcherProjects>((set) => ({
  data: fetcherProjectsDefaultData,
  actions: {
    setList: (name, projects) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list[name] = projects
        }),
      ),
  },
}))
