import { MasonryBuilder } from './builder-class/masonry-builder'
import { configHomeMasonry, configProjectsMasonry } from './config/masonry'

const buildersMasonry: Record<string, MasonryBuilder> = {}

export const HomeMasonry = (() => {
  if (!buildersMasonry.home) {
    buildersMasonry.home = MasonryBuilder.create(configHomeMasonry)
  }
  return buildersMasonry.home
})()

export const ProjectsMasonry = (() => {
  if (!buildersMasonry.projects) {
    buildersMasonry.projects = MasonryBuilder.create(configProjectsMasonry)
  }
  return buildersMasonry.projects
})()
