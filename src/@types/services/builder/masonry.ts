import { z } from 'zod'

export const ZMasonryGridItem = z.object({
  w: z.number(),
  h: z.number(),
  area: z.number(),
  className: z.string(),
})

export const ZMasonryGridContent = z.object({
  src: z.string(),
  link: z.string().optional(),
  className: z.string().optional(),
})

export const ZMasonryProps = z.object({
  name: z.string(),
  area: z.number().optional(),
  fill: ZMasonryGridItem,
  sizes: z.array(ZMasonryGridItem),
  random: z.boolean(),
  contents: z.array(ZMasonryGridContent),
  required: ZMasonryGridItem,
})

//
//
//

export type TMasonryGridItem = z.infer<typeof ZMasonryGridItem>
export type TMasonryGridContent = z.infer<typeof ZMasonryGridContent>
export type TMasonryProps = z.infer<typeof ZMasonryProps>
