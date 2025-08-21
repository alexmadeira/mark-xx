import { z } from 'zod/v4'

import { ZUIMotion } from './global'

export const ZUIHero = z.object({
  banner: ZUIMotion,
  bannerOverlay: ZUIMotion,
})

//
//
//
//

export type TUIHero = z.infer<typeof ZUIHero>
