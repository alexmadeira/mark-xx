import type { TStoreFetcherProjects } from '@/services/store/fetcher-projects'

import { produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherProjectsDefaultData } from './_defaults/fetcher-projects'

export const useFetcherProjects = create<TStoreFetcherProjects>((set) => ({
  data: fetcherProjectsDefaultData,
  actions: {
    setProjectPageStatus: (slug, status) =>
      set((state) =>
        produce(state, (draft) => {
          if (state.data.pages[slug]?.status === 'loaded') return
          _.set(draft.data.pages, [slug, 'status'], status)
        }),
      ),
    setList: (name, projects) =>
      set((state) =>
        produce(state, (draft) => {
          if (_.isEqual(state.data.list[name], projects)) return
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
  },
}))
