import { MasonryBuilder } from './builder-class/masonry-builder'
import { configHomeMasonry } from './config/masonry'

const buildersMasonry: Record<string, MasonryBuilder> = {}

export const HomeMasonry = (() => {
  if (!buildersMasonry.home) {
    buildersMasonry.home = MasonryBuilder.create(configHomeMasonry)
  }
  return buildersMasonry.home
})()
