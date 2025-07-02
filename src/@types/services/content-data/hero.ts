import { z } from 'zod'

import { ZDataMotion } from './global'

export const ZDataHero = z.object({
  banner: ZDataMotion,
  bannerOverlay: ZDataMotion,
})

//
//
//
//

export type TDataHero = z.infer<typeof ZDataHero>
