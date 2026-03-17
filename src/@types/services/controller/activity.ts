import { ZCWindowEvent, ZCWindowEventKey } from '@/core/window'
import { ZEActivityStatus } from '@/enums/activity'
import { ZSchemaActivityMonitor } from '@/services/schema/activity'

import { z } from 'zod/v4'

export const ZActivityEvents = z.set(ZCWindowEventKey)
export const ZActivityMonitorCancel = z.custom<() => void>()
export const ZActivityMonitorEvents = z.map(z.string(), z.set(z.string()))
export const ZActivityMonitorCancels = z.map(z.string(), ZActivityMonitorCancel)

export const ZActivityRouteActivityProps = z.tuple([ZCWindowEvent])
export const ZActivityHandleActivityProps = z.tuple([ZCWindowEvent])
export const ZActivityCreateMonitorProps = z.tuple([z.string(), ZSchemaActivityMonitor.partial({ status: true })])

export const ZActivityProps = z.object({
  debounceDelay: z.number().optional(),
  defautStatus: ZEActivityStatus.optional(),
})

//
//
//

export type TActivityEvents = z.infer<typeof ZActivityEvents>
export type TActivityMonitorCancel = z.infer<typeof ZActivityMonitorCancel>
export type TActivityMonitorEvents = z.infer<typeof ZActivityMonitorEvents>
export type TActivityMonitorCancels = z.infer<typeof ZActivityMonitorCancels>

export type TActivityRouteActivityProps = z.infer<typeof ZActivityRouteActivityProps>
export type TActivityHandleActivityProps = z.infer<typeof ZActivityHandleActivityProps>
export type TActivityCreateMonitorProps = z.infer<typeof ZActivityCreateMonitorProps>

export type TActivityProps = z.infer<typeof ZActivityProps>
