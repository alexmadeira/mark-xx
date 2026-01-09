import { z } from 'zod/v4'

import { PROJECT_BLOCK_FULL_IMAGE_SIZES } from '_SRV/constant/project'

export const ZEProjectBlockFullImageSize = z.enum(PROJECT_BLOCK_FULL_IMAGE_SIZES)

//
//
//
//

export type TEProjectBlockFullImageSize = z.infer<typeof ZEProjectBlockFullImageSize>
