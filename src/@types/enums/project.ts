import { z } from 'zod/v4'

import { PROJECT_BLOCK_FULL_IMAGE_SIZES, PROJECT_BLOCK_IMAGE_GRID_HOVER_STYLES } from '_SRV/constant/project'

export const ZEProjectBlockFullImageSize = z.enum(PROJECT_BLOCK_FULL_IMAGE_SIZES)
export const ZEProjectBlockImageGridHoverStyle = z.enum(PROJECT_BLOCK_IMAGE_GRID_HOVER_STYLES)

//
//
//
//

export type TEProjectBlockFullImageSize = z.infer<typeof ZEProjectBlockFullImageSize>
export type TEProjectBlockImageGridHoverStyle = z.infer<typeof ZEProjectBlockImageGridHoverStyle>
