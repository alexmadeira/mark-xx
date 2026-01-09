import type { TScrollingCreateProps } from '@/services/controller/scrolling'

export const defaultScrollingProps = {
  duration: 2,
  syncTouch: true,
  autoRaf: true,
  autoResize: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
} satisfies TScrollingCreateProps
