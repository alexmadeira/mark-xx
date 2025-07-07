import { ParticlesBuilder } from './builder-class/particle-builder'
import { configParticles } from './config/particles'

const buildersParticles: Record<string, ParticlesBuilder> = {}
export function particles(particles: keyof typeof configParticles) {
  if (!buildersParticles[particles]) {
    buildersParticles[particles] = ParticlesBuilder.create(configParticles[particles])
  }
  return buildersParticles[particles]
}
