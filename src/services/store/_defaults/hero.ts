import type { TStoreHeroData } from '@/services/store/hero'

import { technologies } from '_SRV/content-data/technologies'

export const heroDefaultData = {
  current: {
    content: {
      id: technologies.web.id,
      name: technologies.web.name,
      color: technologies.web.color,
      banner: technologies.web.banner,
      type: technologies.web.typing,
    },
    typing: '',
  },
} satisfies TStoreHeroData
