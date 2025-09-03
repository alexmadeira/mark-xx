import type { TFetcherPrefetch } from '@/interfaces/fetcher'

import { z } from 'zod/v4'

export const ZPrefetchingPrefetcher = z.custom<TFetcherPrefetch>()

export const ZPrefetchingPrefetchList = z.map(
  z.string(),
  z
    .object({
      status: z.enum(['pending', 'fetched']),
    })
    .and(ZPrefetchingPrefetcher),
)

export const ZPrefetchingFetcherKeyProps = z.tuple([ZPrefetchingPrefetcher])
export const ZPrefetchingPrepareProps = z.tuple([z.array(ZPrefetchingPrefetcher)])
export const ZPrefetchingSetPrefetcherProps = z.tuple([
  z.union([ZPrefetchingPrefetcher, z.array(ZPrefetchingPrefetcher)]),
])

export const ZPrefetchingProps = z.object({
  prefetchers: z.array(ZPrefetchingPrefetcher),
})

//
//
//

export type TPrefetchingPrefetcher = z.infer<typeof ZPrefetchingPrefetcher>
export type TPrefetchingPrefetchList = z.infer<typeof ZPrefetchingPrefetchList>
export type TPrefetchingFetcherKeyProps = z.infer<typeof ZPrefetchingFetcherKeyProps>
export type TPrefetchingPrepareProps = z.infer<typeof ZPrefetchingPrepareProps>
export type TPrefetchingSetPrefetcherProps = z.infer<typeof ZPrefetchingSetPrefetcherProps>

export type TPrefetchingProps = z.infer<typeof ZPrefetchingProps>
