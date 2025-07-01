import type { TStoreHeroData } from '@/services/store/hero'

import { technologies } from '_SRV/content-data/technologies'

export const heroDefaultData = {
  current: {
    id: technologies.web.id,
    name: technologies.web.name,
    color: technologies.web.color,
    banner: technologies.web.banner,
    content: technologies.web.typing,
  },
} satisfies TStoreHeroData
