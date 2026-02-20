import _ from 'lodash'

import { MasonryBuilder } from './masonry-builder'
import { masonryConfig } from './masonry-config'

const buildersMasonry: Record<string, MasonryBuilder> = {}

export function masonry(name: string) {
  if (!buildersMasonry[name]) {
    buildersMasonry[name] = new MasonryBuilder(_.get(masonryConfig, name, masonryConfig.default))
  }

  return buildersMasonry[name]
}
