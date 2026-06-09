import { z } from 'zod/v4'

import { ZEAwardType } from '@/enums/award'
import { ZSchemaAward } from '@/services/schema/award'

export const ZAwardsAwardProps = ZSchemaAward

export const ZAwardsAwardIconProps = z.object({
  type: ZEAwardType.nullish(),
  className: z.string().optional(),
})
//
//
//
//

export type TAwardsAwardProps = z.infer<typeof ZAwardsAwardProps>
export type TAwardsAwardIconProps = z.infer<typeof ZAwardsAwardIconProps>
