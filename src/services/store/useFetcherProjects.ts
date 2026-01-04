import type { TStoreFetcherProjects } from '@/services/store/fetcher-projects'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherProjectsDefaultData } from './_defaults/fetcher-projects'

export const useFetcherProjects = create<TStoreFetcherProjects>((set) => ({
  data: fetcherProjectsDefaultData,
  actions: {
    setList: (name, projects) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list[name] = projects
        }),
      ),
    setProjectPage: (slug, project) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.pages[slug] = {
            ...(state.data.pages[slug] || {}),
            ...project,
          }
        }),
      ),
    setProjectPageStatus: (slug, status) =>
      set((state) =>
        produce(state, (draft) => {
          _.set(draft.data.pages, [slug, 'status'], status)
        }),
      ),
  },
}))
