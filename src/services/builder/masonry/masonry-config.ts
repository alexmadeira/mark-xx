import type { TMasonryProps } from '@/services/builder/masonry'

import { MasonrySize } from './masonry-size'

const configDefaultMasonry = {
  name: 'default-masonry',
  random: false,
  fill: MasonrySize.gridSize('2x2'),
  required: MasonrySize.gridSize('8x8'),
  sizes: [MasonrySize.gridSize('4x4'), MasonrySize.gridSize('4x2'), MasonrySize.gridSize('2x4')],
}

const configHomeMasonry = {
  name: 'home-masonry',
  area: 124,
  random: true,
  fill: MasonrySize.gridSize('2x2'),
  required: MasonrySize.gridSize('8x8'),
  sizes: [MasonrySize.gridSize('4x4', 1), MasonrySize.gridSize('4x2', 2), MasonrySize.gridSize('2x4', 1)],
}

const configProjectsMasonry = {
  name: 'projects-masonry',
  random: false,
  fill: MasonrySize.gridSize('2x2'),
  required: MasonrySize.gridSize('8x8'),
  sizes: [MasonrySize.gridSize('4x4', 1), MasonrySize.gridSize('4x2'), MasonrySize.gridSize('2x4')],
}

const configProjectMasonry = {
  name: 'project-masonry',
  random: true,
  area: 124,
  fill: MasonrySize.gridSize('2x2'),
  required: MasonrySize.gridSize('8x8'),
  sizes: [MasonrySize.gridSize('4x4', 1), MasonrySize.gridSize('4x2'), MasonrySize.gridSize('2x4')],
}

export const masonryConfig = {
  home: configHomeMasonry,
  projects: configProjectsMasonry,
  project: configProjectMasonry,
  default: configDefaultMasonry,
} satisfies Record<string, TMasonryProps>
