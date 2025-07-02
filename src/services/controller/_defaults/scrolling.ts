import type { TScrollingCreateProps } from '@/services/controller/scrolling'

export const defaultScrollingProps = {
  duration: 3,
  syncTouch: true,
  autoRaf: true,
  autoResize: true,
} satisfies TScrollingCreateProps
