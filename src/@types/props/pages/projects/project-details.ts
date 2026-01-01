import { z } from 'zod/v4'

export const ZProjectProject = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  color: z.string(),
  description: z.string(),
  banner: z.url().optional(),
  bannerName: z.string().optional(),
  bannerClass: z.string().optional(),
  thumbnail: z.url().optional(),
  thumbnailClass: z.string().optional(),
  tags: z.string().array(),
})
export const ZProjectDetailsProps = z.intersection(ZProjectProject, z.object({ className: z.string().optional() }))
export const ZProjectDetailsContentProps = ZProjectProject

//
//
//
//

export type TProjectDetailsProps = z.infer<typeof ZProjectDetailsProps>
export type TProjectDetailsContentProps = z.infer<typeof ZProjectDetailsContentProps>
