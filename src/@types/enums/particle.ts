import { z } from 'zod/v4'

import {
  PARTICLE_ANIMATION_DESTROY,
  PARTICLE_ANIMATION_MODES,
  PARTICLE_ANIMATION_START,
  PARTICLE_AUTO_PUSH_MODES,
  PARTICLE_COLLISION_MODES,
  PARTICLE_LIMIT_ACTION,
  PARTICLE_MOVE_DIRECTIONS,
  PARTICLE_OUT_MODES,
} from '_SRV/constant/particle'

export const ZEParticleAnimationDestroy = z.enum(PARTICLE_ANIMATION_DESTROY)
export const ZEParticleAnimationMode = z.enum(PARTICLE_ANIMATION_MODES)
export const ZEParticleAnimationStart = z.enum(PARTICLE_ANIMATION_START)
export const ZEParticleAutoPushMode = z.enum(PARTICLE_AUTO_PUSH_MODES)
export const ZEParticleCollisionMode = z.enum(PARTICLE_COLLISION_MODES)
export const ZEParticleLimitAction = z.enum(PARTICLE_LIMIT_ACTION)
export const ZEParticleMoveDirections = z.enum(PARTICLE_MOVE_DIRECTIONS)
export const ZEParticleOutMode = z.enum(PARTICLE_OUT_MODES)

//
//
//
//

export type TEParticleAnimationDestroy = z.infer<typeof ZEParticleAnimationDestroy>
export type TEParticleAnimationMode = z.infer<typeof ZEParticleAnimationMode>
export type TEParticleAnimationStart = z.infer<typeof ZEParticleAnimationStart>
export type TEParticleAutoPushMode = z.infer<typeof ZEParticleAutoPushMode>
export type TEParticleCollisionMode = z.infer<typeof ZEParticleCollisionMode>
export type TEParticleLimitAction = z.infer<typeof ZEParticleLimitAction>
export type TEParticleMoveDirection = z.infer<typeof ZEParticleMoveDirections>
export type TEParticleOutMode = z.infer<typeof ZEParticleOutMode>
