import { ZEMasonrySize } from '@/enums/masonry'

import { z } from 'zod/v4'

export const ZMasonryGridSize = z.object({
  w: z.number(),
  h: z.number(),
  limit: z.number().optional(),
  className: z.string().optional(),
})
export const ZMasonryGridSizes = z.record(ZEMasonrySize, ZMasonryGridSize)

export const ZMasonrySizeGridSizeProps = z.tuple([ZEMasonrySize, z.number().optional()])

//
//
//

export type TMasonryGridSize = z.infer<typeof ZMasonryGridSize>
export type TMasonryGridSizes = z.infer<typeof ZMasonryGridSizes>

export type TMasonrySizeGridSizeProps = z.infer<typeof ZMasonrySizeGridSizeProps>
