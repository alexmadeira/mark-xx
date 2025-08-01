import type { TStoreRequester, TStoreRequesterWaitForProps } from '@/services/store/requester'

import { produce } from 'immer'
import _ from 'lodash'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { filter } from 'rxjs/operators'
import { create } from 'zustand'

import { requesterDefaultData } from './_defaults/requester'

const storeRequester = create<TStoreRequester>((set) => ({
  data: requesterDefaultData,
  actions: {
    setCacheStatus: (status) =>
      set((state) =>
        produce(state, (draft) => {
          draft.data.cache.restoreStatus = status
          switch (status) {
            case 'idle':
              draft.data.cache.restored = false
              draft.data.cache.empty = true
              break
            case 'restored':
              draft.data.cache.empty = false
              draft.data.cache.restored = true
              break
            case 'restoring':
              draft.data.cache.restored = false
              break
            case 'error':
              draft.data.cache.restored = false
              break
          }
        }),
      ),
  },
}))

storeRequester.subscribe((state) => {
  for (const key in requester$.cache) {
    const cacheKey = key as keyof typeof requester$.cache
    if (requester$.cache[cacheKey].value !== state.data.cache[cacheKey]) {
      requester$.cache[cacheKey].next(state.data.cache[cacheKey])
    }
  }
})

async function waitFor(...[path, equals]: TStoreRequesterWaitForProps) {
  const data$ = _.get(requester$, path)
  if (!data$) throw new Error(`Path "${path}" not found in requester$`)

  if (_.castArray(equals as unknown).includes(data$.value)) return
  await firstValueFrom(data$.pipe(filter((status) => _.castArray(equals as unknown).includes(status))))
}

export const requester$ = {
  cache: {
    restoreStatus: new BehaviorSubject<unknown>(storeRequester.getState().data.cache.restoreStatus),
    restored: new BehaviorSubject<unknown>(storeRequester.getState().data.cache.restored),
    empty: new BehaviorSubject<unknown>(storeRequester.getState().data.cache.empty),
  },
}

export const useRequester = {
  waitFor,
  ...storeRequester,
}
