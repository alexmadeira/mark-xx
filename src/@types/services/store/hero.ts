import { z } from 'zod'

export const ZStoreHeroCurrentProps = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  banner: z.string(),
})
export const ZStoreHeroCurrent = z
  .object({
    content: z.string(),
  })
  .and(ZStoreHeroCurrentProps)

export const ZStoreHeroData = z.object({
  current: ZStoreHeroCurrent,
})

export const ZStoreHeroActions = z.object({
  setCurrent: z.function(z.tuple([z.string(), ZStoreHeroCurrentProps])).returns(z.void()),
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
