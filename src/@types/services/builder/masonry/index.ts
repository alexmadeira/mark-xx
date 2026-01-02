import type { HTMLAttributes } from 'react'

import { ZEMasonrySize } from '@/enums/masonry'

import { z } from 'zod/v4'

import { ZMasonryGridSize } from './masonry-size'

export const ZMasonryContentMeta = z.record(z.string(), z.unknown())
export const ZMasonryGridSizeList = z.array(ZMasonryGridSize)
export const ZMasonryAvaliableGridSizes = z.record(ZEMasonrySize, ZMasonryGridSize)

export const ZMasonryCurrentArea = z.object({
  size: z.number().default(0),
  items: z.number().default(0),
  maxArea: z.number().default(0),
})

export function ZMasonryContent<T extends z.infer<typeof ZMasonryContentMeta>>() {
  return z.object({
    color: z.string(),
    link: z.string().optional(),
    metaData: z.custom<T>().optional(),
    className: z.string().optional(),
  })
}

export const ZMasonrySizeProps = ZMasonryGridSize
export const ZMasonryFitSizeProps = ZMasonryGridSize
export const ZMasonrySetContentsProps = ZMasonryContent().array().optional()
export const ZMasonryContentWrapperProps = z.intersection(
  z.custom<HTMLAttributes<HTMLElement>>(),
  z.object({
    key: z.string(),
    link: z.string().optional(),
    ...ZMasonryGridSize.shape,
  }),
)

export function ZMasonryRenderProps<T extends z.infer<typeof ZMasonryContentMeta>>() {
  return z.intersection(
    z.custom<HTMLAttributes<HTMLHeadingElement>>(),
    z.object({
      contents: ZMasonryContent<T>().array().optional(),
    }),
  )
}

export const ZMasonryProps = z.object({
  name: z.string(),
  fill: ZMasonryGridSize,
  sizes: ZMasonryGridSizeList,
  area: z.number().optional(),
  random: z.boolean().optional(),
  required: ZMasonryGridSize.optional(),
})

//
//
//

export type TMasonryCurrentArea = z.infer<typeof ZMasonryCurrentArea>
export type TMasonryGridSizeList = z.infer<typeof ZMasonryGridSizeList>
export type TMasonryAvaliableGridSizes = z.infer<typeof ZMasonryAvaliableGridSizes>
export type TMasonryContentMeta = z.infer<typeof ZMasonryContentMeta>

export type TMasonrySizeProps = z.infer<typeof ZMasonrySizeProps>
export type TMasonryFitSizeProps = z.infer<typeof ZMasonryFitSizeProps>
export type TMasonrySetContentsProps = z.infer<typeof ZMasonrySetContentsProps>
export type TMasonryContentWrapperProps = z.infer<typeof ZMasonryContentWrapperProps>

export type TMasonryContent<T extends TMasonryContentMeta = TMasonryContentMeta> = z.inferGeneric<
  typeof ZMasonryContent<T>
>

export type TMasonryRenderProps<T extends TMasonryContentMeta = TMasonryContentMeta> = z.inferGeneric<
  typeof ZMasonryRenderProps<T>
>

export type TMasonryProps = z.infer<typeof ZMasonryProps>
