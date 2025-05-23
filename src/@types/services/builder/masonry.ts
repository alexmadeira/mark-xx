import { z } from 'zod'

export const ZMasonryCurrentArea = z.object({
  size: z.number().default(0),
  items: z.number().default(0),
  maxArea: z.number().nullish(),
})

export const ZMasonryGridSize = z.object({
  w: z.number(),
  h: z.number(),
  className: z.string().optional(),
  limit: z.number().optional(),
})

export const ZMasonryAvaliableGridSizes = z.record(z.string(), ZMasonryGridSize)

export const ZMasonryContent = z.object({
  className: z.string().optional(),
  link: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
})

export const ZMasonryProps = z.object({
  name: z.string(),
  area: z.number().optional(),
  fill: ZMasonryGridSize,
  sizes: z.array(ZMasonryGridSize),
  random: z.boolean(),
  contents: z.array(ZMasonryContent),
  required: ZMasonryGridSize.optional(),
})

//
//
//

export type TMasonryCurrentArea = z.infer<typeof ZMasonryCurrentArea>
export type TMasonryGridSize = z.infer<typeof ZMasonryGridSize>
export type TMasonryAvaliableGridSizes = z.infer<typeof ZMasonryAvaliableGridSizes>
export type TMasonryContent = z.infer<typeof ZMasonryContent>
export type TMasonryProps = z.infer<typeof ZMasonryProps>
