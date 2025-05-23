import { z } from 'zod'

export const ZMasonryGridItemLimit = z.number()

export const ZMasonryGridItem = z.object({
  w: z.number(),
  h: z.number(),
  className: z.string().optional(),
  limit: ZMasonryGridItemLimit.optional(),
})

export const ZMasonryAvaliableSizes = z.record(z.string(), ZMasonryGridItem)

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
  fill: ZMasonryGridItem,
  sizes: z.array(ZMasonryGridItem),
  random: z.boolean(),
  contents: z.array(ZMasonryContent),
  required: ZMasonryGridItem.optional(),
})

//
//
//

export type TMasonryGridItem = z.infer<typeof ZMasonryGridItem>
export type TMasonryAvaliableSizes = z.infer<typeof ZMasonryAvaliableSizes>
export type TMasonryContent = z.infer<typeof ZMasonryContent>
export type TMasonryProps = z.infer<typeof ZMasonryProps>
