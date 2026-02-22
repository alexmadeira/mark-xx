import type { HTMLMotionProps } from 'motion/react'
import type { HTMLAttributes } from 'react'

import { ZSchemaUIImageSRC } from '@/services/schema/image'

import { z } from 'zod/v4'

export const ZPageImageProps = z.intersection(
  z.custom<Omit<HTMLMotionProps<'img'>, 'src'>>(),
  z.object({
    src: ZSchemaUIImageSRC,
  }),
)
export const ZPageImageLoaderProps = z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>()
//
//
//
//

export type TPageImageProps = z.infer<typeof ZPageImageProps>
export type TPageImageLoaderProps = z.infer<typeof ZPageImageLoaderProps>
