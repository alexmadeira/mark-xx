import { z } from 'zod/v4'

import { ZSchemaUIImageSRC } from '../schema/image'

export const ZStoreHeroCurrentProps = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.string(),
  banner: ZSchemaUIImageSRC.optional(),
})

export const ZStoreHeroData = z.object({
  current: ZStoreHeroCurrentProps.nullish(),
  color: z.string(),
  typing: z.string().nullish(),
})

export const ZStoreHeroActions = z.object({
  setCurrent: z.custom<(content: z.infer<typeof ZStoreHeroCurrentProps>) => void>(),
  setColor: z.custom<(color: string) => void>(),
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
