import type { HTMLAttributes } from 'react'

import { ZEProjectBlockFullImageSize } from '@/enums/project'

import { z } from 'zod/v4'

export const ZProjectBlockFullImageProps = z.intersection(
  z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>(),
  z.object({
    url: z.url().optional(),
    color: z.string(),
    size: ZEProjectBlockFullImageSize,
  }),
)
export const ZProjectBlockImageGridProps = z.intersection(
  z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>(),
  z.object({
    gap: z.boolean(),
    columns: z.number(),
    images: z.array(
      z.object({
        name: z.string(),
        color: z.string(),
        url: z.url().optional(),
      }),
    ),
  }),
)

//
//
//
//

export type TProjectBlockFullImageProps = z.infer<typeof ZProjectBlockFullImageProps>
export type TProjectBlockImageGridProps = z.infer<typeof ZProjectBlockImageGridProps>
