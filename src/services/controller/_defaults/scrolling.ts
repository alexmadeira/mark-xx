import type { TScrollingCreateProps } from '@/services/controller/scrolling'

export const defaultScrollingProps = {
  duration: 5,
  syncTouch: true,
  autoRaf: true,
  autoResize: true,
} satisfies TScrollingCreateProps
