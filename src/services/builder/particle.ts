import { ParticlesBuilder } from './builder-class/particle-builder'
import { configAboutParticles } from './config/particles'

const buildersParticles: Record<string, ParticlesBuilder> = {}

export const AboutParticles = (() => {
  if (!buildersParticles.about) {
    buildersParticles.about = ParticlesBuilder.create(configAboutParticles)
  }
  return buildersParticles.about
})()
