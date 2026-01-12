import type { HTMLAttributes } from 'react'

import { ZEProjectBlockFullImageSize, ZEProjectBlockImageGridHoverStyle } from '@/enums/project'

import { z } from 'zod/v4'

export const ZProjectBlockFullImageProps = z.intersection(
  z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>(),
  z.object({
    url: z.url().optional(),
    color: z.string(),
    size: ZEProjectBlockFullImageSize,
  }),
)

export const ZProjectBlockImageGridImageProps = z.object({
  id: z.string(),
  name: z.string(),
  rows: z.number(),
  cols: z.number(),
  color: z.string(),
  url: z.url().optional(),
})
export const ZProjectBlockImageGridProps = z.intersection(
  z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>(),
  z.object({
    gap: z.boolean(),
    columns: z.number(),
    hoverStyle: ZEProjectBlockImageGridHoverStyle,
    images: ZProjectBlockImageGridImageProps.array(),
  }),
)

//
//
//
//

export type TProjectBlockFullImageProps = z.infer<typeof ZProjectBlockFullImageProps>

export type TProjectBlockImageGridImageProps = z.infer<typeof ZProjectBlockImageGridImageProps>
export type TProjectBlockImageGridProps = z.infer<typeof ZProjectBlockImageGridProps>
