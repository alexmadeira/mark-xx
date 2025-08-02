import { z } from 'zod/v4'

import { HERO_STATUS } from '_SRV/constant/hero'

export const ZEHeroStatus = z.enum(HERO_STATUS)

//
//
//
//

export type TEHeroStatus = z.infer<typeof ZEHeroStatus>
