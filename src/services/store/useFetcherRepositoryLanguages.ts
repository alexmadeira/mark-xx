import type { TStoreFetcherRepositoryLanguages } from '@/services/store/fetcher-repository-languages'

import { current, produce } from 'immer'
import _ from 'lodash'
import { create } from 'zustand'

import { fetcherRepositoryLanguagesDefaultData } from './_defaults/fetcher-repository-languages'

export const useFetcherRepositoryLanguages = create<TStoreFetcherRepositoryLanguages>((set) => ({
  data: fetcherRepositoryLanguagesDefaultData,
  actions: {
    setStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.status = status
        }),
      ),
    setList: (repository, languages) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.list[repository] = languages
          const languageUsage = _.chain(current(draft.data.list))
            .values()
            .flatten()
            .groupBy('id')
            .map((items) => {
              const libs = _.chain(items)
                .flatMap((item) => item.libs ?? [])
                .groupBy('id')
                .map((pkgs) => ({
                  id: pkgs[0].id,
                  name: pkgs[0].name,
                  usage: _.sumBy(pkgs, 'usage'),
                }))
                .orderBy('usage', 'desc')
                .value()

              return {
                id: items[0].id,
                name: items[0].name,
                usage: _.sumBy(items, 'usage'),
                libs,
              }
            })
            .orderBy('usage', 'desc')
            .value()

          draft.data.languageUsage = languageUsage
          draft.data.totalUsage = _.sumBy(_.values(languageUsage), 'usage')
        }),
      ),
  },
}))
