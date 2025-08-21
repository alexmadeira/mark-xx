import { z } from 'zod/v4'

import { MASONRY_SIZES } from '_SRV/constant/masonry'

export const ZEMasonrySize = z.enum(MASONRY_SIZES)

//
//
//
//

export type TEMasonrySize = z.infer<typeof ZEMasonrySize>
