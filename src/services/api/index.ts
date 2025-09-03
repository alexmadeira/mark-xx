import type { requesterPaths } from '_CFG/requester/paths'

import { markXXPaths } from '_CFG/requester/paths/mark-xx'

import { loader } from '_SRV/builder/loader'
import { queryClient } from '_SRV/lib'

import { ApiRequester } from './api-requester'

const apiRequesters: Record<string, ApiRequester<typeof requesterPaths>> = {}

export function veronica(): ApiRequester<typeof markXXPaths> {
  if (apiRequesters.veronica) return apiRequesters.veronica

  apiRequesters.veronica = new ApiRequester(
    {
      host: 'http://localhost:3001/api/',
      paths: markXXPaths,
      queryClient,
    },
    loader(),
  )

  return apiRequesters.veronica
}
