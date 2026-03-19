import { ZCWindowEventKey } from '@/core/window'
import { ZEActivityStatus } from '@/enums/activity'

import { z } from 'zod/v4'

export const ZSchemaActivityMonitor = z.object({
  timeout: z.number(),
  status: ZEActivityStatus,
  events: ZCWindowEventKey.array(),
})

//
//
//
//

export type TSchemaActivityMonitor = z.infer<typeof ZSchemaActivityMonitor>
