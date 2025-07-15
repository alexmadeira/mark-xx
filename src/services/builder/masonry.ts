import { MasonryBuilder } from './builder-class/masonry-builder'
import { configHomeMasonry, configProjectMasonry, configProjectsMasonry } from './config/masonry'

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
export const ProjectMasonry = (() => {
  if (!buildersMasonry.project) {
    buildersMasonry.project = MasonryBuilder.create(configProjectMasonry)
  }
  return buildersMasonry.project
})()
