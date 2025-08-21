import { z } from 'zod/v4'

export const ZStoreHeroCurrentProps = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  banner: z.string(),
  type: z.string(),
})

export const ZStoreHeroData = z.object({
  current: ZStoreHeroCurrentProps.nullish(),
  typing: z.string(),
})

export const ZStoreHeroActions = z.object({
  setCurrent: z.custom<(content: z.infer<typeof ZStoreHeroCurrentProps>) => void>(),
  setTyping: z.custom<(typing: string) => void>(),
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
