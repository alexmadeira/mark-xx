import { z } from 'zod/v4'

export const ZStoreHeroCurrentProps = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  banner: z.string(),
  type: z.string(),
})
export const ZStoreHeroCurrent = z.object({
  typing: z.string(),
  content: ZStoreHeroCurrentProps,
})

export const ZStoreHeroData = z.object({
  current: ZStoreHeroCurrent,
})

export const ZStoreHeroActions = z.object({
  setCurrent: z.custom<(typing: string, content: z.infer<typeof ZStoreHeroCurrentProps>) => void>(),
})

export const ZStoreHero = z.object({
  data: ZStoreHeroData,
  actions: ZStoreHeroActions,
})

//
//
//
//

export type TStoreHeroData = z.infer<typeof ZStoreHeroData>
export type TStoreHeroActions = z.infer<typeof ZStoreHeroActions>
export type TStoreHero = z.infer<typeof ZStoreHero>
