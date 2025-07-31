import { queryClient } from '_SRV/lib'

import { ApiRequester } from './api-requester'

const apiRequesters: Record<string, ApiRequester> = {}

export function notionApi() {
  if (apiRequesters.notion) return apiRequesters.notion

  apiRequesters.notion = ApiRequester.create({
    host: 'https://api.notion.com/v1',
    queryClient,
  })

  return apiRequesters.notion
}
