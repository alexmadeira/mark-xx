import type { TUIMotionVariants } from '@/config/ui/global'

import { ZUIHero } from '@/config/ui/hero'

const bannerVariants: TUIMotionVariants = {
  exit: { opacity: 0, transition: { duration: 2 } },
  initial: { opacity: 0, scale: 1, transition: { duration: 4 } },
  animate: {
    opacity: 0.4,
    scale: 1.2,
    transition: {
      opacity: { duration: 4 },
      scale: { duration: 40 },
    },
  },
}

const bannerOverlayVariants: TUIMotionVariants = {
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

export const uiConfigHero = ZUIHero.parse({
  banner: { variants: bannerVariants },
  bannerOverlay: { variants: bannerOverlayVariants },
})
