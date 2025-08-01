import type { ZEPersistCacheStatus, ZEPersistClientStatus } from '@/enums/persist'
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client'

import { z } from 'zod/v4'

export const ZPersistData = z.custom<PersistedClient>()
export const ZPersistEvents = z.object({
  setCacheStatus: z.custom<(status: z.infer<typeof ZEPersistCacheStatus>) => void>(),
  setPersistClientStatus: z.custom<(status: z.infer<typeof ZEPersistClientStatus>) => void>(),
})

export const ZPersisterProps = z.object({
  storageKey: z.string(),
})

export const ZPersister = z.custom<Persister>()

//
//
//
//

export type TPersistData = z.infer<typeof ZPersistData>
export type TPersistEvents = z.infer<typeof ZPersistEvents>
export type TPersisterProps = z.infer<typeof ZPersisterProps>

export interface IPersister extends z.infer<typeof ZPersister> {}
