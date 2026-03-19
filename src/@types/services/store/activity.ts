import { ZEActivityStatus } from '@/enums/activity'
import { ZSchemaActivityMonitor } from '@/services/schema/activity'

import { z } from 'zod/v4'

export const ZStoreActivityStatus = ZEActivityStatus
export const ZStoreActivityMonitor = ZSchemaActivityMonitor

export const ZStoreActivityMonitors = z.record(z.string(), ZStoreActivityMonitor)
export const ZStoreActivityData = z.object({
  monitors: ZStoreActivityMonitors,
})

export const ZStoreActivityActions = z.object({
  setMonitor: z.custom<(name: string, monitor: z.infer<typeof ZStoreActivityMonitor>) => void>(),
  setStatus: z.custom<(name: string, status: z.infer<typeof ZEActivityStatus>) => void>(),
})

export const ZStoreActivity = z.object({
  data: ZStoreActivityData,
  actions: ZStoreActivityActions,
})

//
//
//
//

export type TStoreActivityStatus = z.infer<typeof ZStoreActivityStatus>
export type TStoreActivityMonitor = z.infer<typeof ZStoreActivityMonitor>

export type TStoreActivityMonitors = z.infer<typeof ZStoreActivityMonitors>
export type TStoreActivityData = z.infer<typeof ZStoreActivityData>

export type TStoreActivityActions = z.infer<typeof ZStoreActivityActions>
export type TStoreActivity = z.infer<typeof ZStoreActivity>
