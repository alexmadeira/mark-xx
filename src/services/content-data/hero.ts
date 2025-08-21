import type { TDataMotionVariants } from '@/services/content-data/global'

import { ZDataHero } from '@/services/content-data/hero'

const bannerVariants: TDataMotionVariants = {
  exit: { opacity: 0, transition: { duration: 2 } },
  initial: { opacity: 0, scale: 1, transition: { duration: 4 } },
  animate: {
    opacity: 1,
    scale: 1.2,
    transition: {
      opacity: { duration: 4 },
      scale: { duration: 40 },
    },
  },
}

const bannerOverlayVariants: TDataMotionVariants = {
  exit: { opacity: 0, transition: { duration: 2 } },
  initial: { opacity: 0, transition: { duration: 2 } },
  animate: {
    opacity: 0.75,
    transition: { duration: 2 },
  },
}

//
//
//

export const dataHero = ZDataHero.parse({
  banner: { variants: bannerVariants },
  bannerOverlay: { variants: bannerOverlayVariants },
})
