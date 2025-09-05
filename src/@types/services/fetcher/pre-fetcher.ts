import type { TFetcherPrefetch } from '@/interfaces/fetcher'

import { z } from 'zod/v4'

export const ZPreFetcherPrefetcher = z.custom<TFetcherPrefetch>()

export const ZPreFetcherPrefetchList = z.map(
  z.string(),
  z
    .object({
      status: z.enum(['pending', 'fetched']),
    })
    .and(ZPreFetcherPrefetcher),
)

export const ZPreFetcherFetcherKeyProps = z.tuple([ZPreFetcherPrefetcher])
export const ZPreFetcherPrepareProps = z.tuple([z.array(ZPreFetcherPrefetcher)])
export const ZPreFetcherSetPrefetcherProps = z.tuple([z.union([ZPreFetcherPrefetcher, z.array(ZPreFetcherPrefetcher)])])
export const ZPreFetcherSetBackgroundPrefetcherProps = z.tuple([
  z.union([ZPreFetcherPrefetcher, z.array(ZPreFetcherPrefetcher)]),
])
export const ZPreFetcherFetchProps = z.tuple([ZPreFetcherPrefetcher])

//
//
//

export type TPreFetcherPrefetcher = z.infer<typeof ZPreFetcherPrefetcher>
export type TPreFetcherPrefetchList = z.infer<typeof ZPreFetcherPrefetchList>
export type TPreFetcherFetcherKeyProps = z.infer<typeof ZPreFetcherFetcherKeyProps>
export type TPreFetcherPrepareProps = z.infer<typeof ZPreFetcherPrepareProps>
export type TPreFetcherSetPrefetcherProps = z.infer<typeof ZPreFetcherSetPrefetcherProps>
export type TPreFetcherSetBackgroundPrefetcherProps = z.infer<typeof ZPreFetcherSetBackgroundPrefetcherProps>
export type TPreFetcherFetchProps = z.infer<typeof ZPreFetcherFetchProps>
