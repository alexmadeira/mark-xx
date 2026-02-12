import { githubPaths } from '_CFG/requester/paths/github'
import { markXXPaths } from '_CFG/requester/paths/mark-xx'

import { loader } from '_SRV/builder/loader'
import { Requester } from '_SRV/builder/requester'
import { queryClient } from '_SRV/lib'

import { GitHubRequesterApi } from './requester-api/github-requester-api'
import { PrismicRequesterApi } from './requester-api/prismic-requester-api'
import { VeronicaRequesterApi } from './requester-api/veronica-requester-api'

let gitHubRequesterApi: Requester<typeof githubPaths> | null = null
let prismicRequesterApi: Requester<typeof markXXPaths> | null = null
let veronicaRequesterApi: Requester<typeof markXXPaths> | null = null

export function veronica() {
  if (veronicaRequesterApi) return veronicaRequesterApi

  veronicaRequesterApi = new Requester({
    api: VeronicaRequesterApi.create(loader()),
    paths: markXXPaths,
    queryClient,
  })

  return veronicaRequesterApi
}

export function prismic() {
  if (prismicRequesterApi) return prismicRequesterApi

  prismicRequesterApi = new Requester({
    api: PrismicRequesterApi.create(loader()),
    paths: markXXPaths,
    queryClient,
  })

  return prismicRequesterApi
}

export function github() {
  if (gitHubRequesterApi) return gitHubRequesterApi

  gitHubRequesterApi = new Requester({
    api: GitHubRequesterApi.create(loader()),
    paths: githubPaths,
    queryClient,
  })

  return gitHubRequesterApi
}
