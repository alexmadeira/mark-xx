import type { THeroProps } from '@/services/controller/hero-controller'

import { dataHero } from '_SRV/content-data/hero'

export const defaultHeroProps = {
  delay: 3000,
  speed: 120,
  deletionSpeed: 60,
  settings: dataHero,
} satisfies THeroProps
