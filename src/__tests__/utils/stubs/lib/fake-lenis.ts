import { ScrollingController } from '_SRV/controller/scrolling-controller'

export type FakeLenis = {
  actualScroll: number
  isHorizontal: boolean
  isLocked: boolean
  isScrolling: boolean
  isSmooth: boolean
  isStopped: boolean
  limit: number
  progress: number
  scroll: number
  on: ReturnType<typeof vi.fn>
  resize: ReturnType<typeof vi.fn>
  scrollTo: ReturnType<typeof vi.fn>
  start: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
}

export class TestScrollingController extends ScrollingController {
  public constructor(lenis: FakeLenis) {
    super({ lenis: lenis as never })
  }
}

export function makeFakeLenis(): FakeLenis {
  return {
    actualScroll: 12,
    isHorizontal: false,
    isLocked: false,
    isScrolling: false,
    isSmooth: true,
    isStopped: false,
    limit: 1000,
    progress: 0.2,
    scroll: 200,
    on: vi.fn(),
    resize: vi.fn(),
    scrollTo: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }
}
