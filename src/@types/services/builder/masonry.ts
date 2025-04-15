import { z } from 'zod'

export const ZMasonryGridItem = z.object({
  id: z.string(),
  w: z.number(),
  h: z.number(),
  area: z.number(),
  className: z.string(),
})

export const ZMasonryProps = z.object({
  fill: ZMasonryGridItem,
  sizes: z.array(ZMasonryGridItem),
  required: ZMasonryGridItem,
})

export const ZMasonryCreateProps = z.object({
  fill: ZMasonryGridItem.partial({ id: true }),
  required: ZMasonryGridItem.partial({ id: true }),
  sizes: z.array(ZMasonryGridItem.partial({ id: true })),
})

//
//
//

export type TMasonryGridItem = z.infer<typeof ZMasonryGridItem>
export type TMasonryProps = z.infer<typeof ZMasonryProps>
export type TMasonryCreateProps = z.infer<typeof ZMasonryCreateProps>
