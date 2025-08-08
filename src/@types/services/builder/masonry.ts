import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZMasonryCurrentArea = z.object({
  size: z.number().default(0),
  items: z.number().default(0),
  maxArea: z.number().default(0),
})

export const ZMasonryGridSize = z.object({
  w: z.number(),
  h: z.number(),
  limit: z.number().optional(),
  className: z.string().optional(),
})

export const ZMasonryAvaliableGridSizes = z.record(z.string(), ZMasonryGridSize)

export const ZMasonryContentMeta = z.record(z.string(), z.unknown())

export const ZMasonryContent = z.object({
  link: z.string().optional(),
  color: z.string(),
  metaData: ZMasonryContentMeta.optional(),
  className: z.string().optional(),
})

export const ZMasonryContentWrapperProps = z.intersection(
  z.custom<HTMLAttributes<HTMLElement>>(),
  z.object({
    key: z.string(),
    link: z.string().optional(),
    ...ZMasonryGridSize.shape,
  }),
)

export const ZMasonryRenderProps = z.intersection(
  z.custom<HTMLAttributes<HTMLHeadingElement>>(),
  z.object({
    contents: z.array(ZMasonryContent).optional(),
  }),
)

export const ZMasonryProps = z.object({
  name: z.string(),
  fill: ZMasonryGridSize,
  sizes: z.array(ZMasonryGridSize),
  area: z.number().optional(),
  random: z.boolean().optional(),
  required: ZMasonryGridSize.optional(),
})

//
//
//

export type TMasonryCurrentArea = z.infer<typeof ZMasonryCurrentArea>
export type TMasonryGridSize = z.infer<typeof ZMasonryGridSize>
export type TMasonryAvaliableGridSizes = z.infer<typeof ZMasonryAvaliableGridSizes>
export type TMasonryContentMeta = z.infer<typeof ZMasonryContentMeta>
export type TMasonryContent<TMeta extends TMasonryContentMeta = TMasonryContentMeta> = z.infer<
  typeof ZMasonryContent
> & {
  metaData?: TMeta
}

export type TMasonryContentWrapperProps = z.infer<typeof ZMasonryContentWrapperProps>
export type TMasonryRenderProps = z.infer<typeof ZMasonryRenderProps>

export type TMasonryProps = z.infer<typeof ZMasonryProps>
