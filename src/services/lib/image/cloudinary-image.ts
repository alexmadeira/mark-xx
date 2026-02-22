import type { IResize, TResizeSize, TResizeSizes } from '@/services/lib/image/resize'
import type { Nullish } from '@/utils/nullish'

import _ from 'lodash'
import mustache from 'mustache'

export class CloudinaryImage<TSizes extends TResizeSizes> implements IResize<TSizes> {
  constructor(private readonly sizes: TSizes) {}

  private sizeTemplate(size: TResizeSize) {
    const result = ['c_scale']
    if (size.width) result.push('w_{{width}}')
    if (size.height) result.push('h_{{height}}')

    return result.join(',')
  }

  private splitPath(raw?: string) {
    if (!raw) return

    const url = new URL(raw)
    const segments = url.pathname.split('/').filter(Boolean)
    const file = segments.slice(-2).join('/')

    url.pathname = '/' + segments.slice(0, -2).join('/')

    return {
      folder: url.toString(),
      file,
    }
  }

  public resize(raw?: string) {
    const path = this.splitPath(raw)
    const result = {} as Record<keyof TSizes, Nullish<string>>

    for (const key of Object.keys(this.sizes) as (keyof TSizes)[]) {
      const size = this.sizes[key]
      const sizeTemplate = this.sizeTemplate(size)

      if (path) result[key] = `${path.folder}/${mustache.render(sizeTemplate, size)}/${path.file}`
    }

    return result
  }
}
