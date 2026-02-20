import { configParticles } from '_CFG/particles'

import { ParticlesBuilder } from './particle-builder'

const buildersParticles: Record<string, ParticlesBuilder> = {}

export function particles(particles: keyof typeof configParticles) {
  if (!buildersParticles[particles]) {
    buildersParticles[particles] = ParticlesBuilder.create(configParticles[particles])
  }
  return buildersParticles[particles]
}
