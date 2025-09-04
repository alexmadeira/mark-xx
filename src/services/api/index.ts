import type { requesterPaths } from '_CFG/requester/paths'

import { markXXPaths } from '_CFG/requester/paths/mark-xx'

import { loader } from '_SRV/builder/loader'
import { queryClient } from '_SRV/lib'

import { env } from '~/env'

import { ApiRequester } from './api-requester'

const apiRequesters: Record<string, ApiRequester<typeof requesterPaths>> = {}

export function veronica(): ApiRequester<typeof markXXPaths> {
  if (apiRequesters.veronica) return apiRequesters.veronica

  apiRequesters.veronica = new ApiRequester(
    {
      host: env.VITE_VERONICA_API,
      paths: markXXPaths,
      queryClient,
    },
    loader(),
  )

  return apiRequesters.veronica
}
