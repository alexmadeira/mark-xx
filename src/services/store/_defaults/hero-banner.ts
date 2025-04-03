import type { TStoreHeroBannerData } from '@/services/store/hero-banner'

import { technologies } from '_SRV/content-data/technologies'

export const heroBannerDefaultData = {
  current: technologies.web,
  config: {
    delay: 3000,
    speed: 120,
    deletionSpeed: 60,
  },
} satisfies TStoreHeroBannerData
