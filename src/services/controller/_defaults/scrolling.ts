import type { TScrollingCreateProps } from '@/services/controller/scrolling'

export const defaultScrollingProps = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  syncTouch: true,
  autoToggle: true,
  naiveDimensions: true,
  autoRaf: true,
  autoResize: true,
} satisfies TScrollingCreateProps
