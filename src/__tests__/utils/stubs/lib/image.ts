import type { IResize, TResizeImage, TResizeResized, TResizeSizes } from '@/services/lib/image/resize'

import _ from 'lodash'

export class ImageResizeMock<TSizes extends TResizeSizes = TResizeSizes> implements IResize<TSizes> {
  private defaultSizes = {
    blur: { width: 10 },
    card: { width: 320, height: 180 },
    original: { width: 'iw', height: 'ih' },
  }

  public readonly resizeSpy: ReturnType<typeof vi.fn>

  constructor(
    private readonly sizes?: TResizeSizes,
    private resizeResult?: TResizeResized<TSizes>,
  ) {
    this.resizeSpy = vi.fn(this.handleResize.bind(this))
  }

  private handleResize(image?: TResizeImage) {
    if (this.resizeResult) return this.resizeResult

    const result = {} as TResizeResized<TSizes>

    for (const key of Object.keys(this.sizes || this.defaultSizes) as (keyof TSizes)[]) {
      result[key] = image ? `${String(key)}:resized:${String(image)}` : undefined
    }

    return result
  }

  public set result(data: TResizeResized<TSizes>) {
    this.resizeResult = data
  }

  public get resize() {
    return this.resizeSpy
  }
}
