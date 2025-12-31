import { markXXPaths } from '_CFG/requester/paths/mark-xx'

import { loader } from '_SRV/builder/loader'
import { Requester } from '_SRV/builder/requester'
import { queryClient } from '_SRV/lib'

import { PrismicRequesterApi } from './requester-api/prismic-requester-api'
// imp VeronicaRequesterApi } from './requester-api/veronica-requester-api'

let veronicaRequesterApi: Requester<typeof markXXPaths> | null = null

export function veronica() {
  if (veronicaRequesterApi) return veronicaRequesterApi

  veronicaRequesterApi = new Requester({
    api: PrismicRequesterApi.create(loader()),
    paths: markXXPaths,
    queryClient,
  })

  return veronicaRequesterApi
}
