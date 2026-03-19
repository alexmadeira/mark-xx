import { ZEActivityStatus } from '@/enums/activity'

import { z } from 'zod/v4'

export const ZInterfaceEvents = z.object({
  'INTERFACE:Hero:email': z.undefined(),
  'INTERFACE:Activity:idle': z.undefined(),
  'INTERFACE:Activity:active': z.undefined(),
  'INTERFACE:Activity:update': ZEActivityStatus,

  'INTERFACE:Action:toasty': z.undefined(),

  'INTERFACE:Sound:coin': z.undefined(),
  'INTERFACE:Sound:lifeUp': z.undefined(),
})

//
//
//

export type TInterfaceEvents = z.infer<typeof ZInterfaceEvents>
