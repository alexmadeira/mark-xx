import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaNetwork } from '@/services/schema/network'

import { z } from 'zod/v4'

export const ZStoreFetcherNetwork = ZSchemaNetwork

export const ZStoreFetcherNetworksData = z.object({
  list: ZStoreFetcherNetwork.array(),
  status: ZEFetcherStatus,
})
export const ZStoreFetcherNetworksActions = z.object({
  setList: z.custom<(networks: z.infer<typeof ZStoreFetcherNetwork>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherNetworks = z.object({
  data: ZStoreFetcherNetworksData,
  actions: ZStoreFetcherNetworksActions,
})

//
//
//
//

export type TStoreFetcherNetwork = z.infer<typeof ZStoreFetcherNetwork>
export type TStoreFetcherNetworksData = z.infer<typeof ZStoreFetcherNetworksData>
export type TStoreFetcherNetworksActions = z.infer<typeof ZStoreFetcherNetworksActions>
export type TStoreFetcherNetworks = z.infer<typeof ZStoreFetcherNetworks>
