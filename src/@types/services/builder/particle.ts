import type { HTMLAttributes } from 'react'

import {
  ZEParticleAnimationDestroy,
  ZEParticleAnimationMode,
  ZEParticleAnimationStart,
  ZEParticleAutoPushMode,
  ZEParticleCollisionMode,
  ZEParticleLimitAction,
  ZEParticleMoveDirections,
  ZEParticleOutMode,
} from '@/enums/particle'

import { z } from 'zod/v4'

export const ZParticleValue = z.union([z.number(), z.object({ max: z.number(), min: z.number() })])
export const ZParticleAutoPushMode = z.union([ZEParticleAutoPushMode, z.number()])

export const ZParticleCanvasProps = z.custom<Omit<HTMLAttributes<HTMLDivElement>, 'children'>>()

export const ZParticleCollisions = z.object({
  absorb: z.number().optional(),
  maxSpeed: ZParticleValue.optional(),
  mode: ZEParticleCollisionMode.optional(),
})

export const ZParticleMoveGravity = z.object({
  value: z.number(),
  inverse: z.boolean().optional(),
})

export const ZParticleMoveOutModes = z.union([
  z.object({
    default: ZEParticleOutMode.optional(),
    bottom: ZEParticleOutMode.optional(),
    left: ZEParticleOutMode.optional(),
    right: ZEParticleOutMode.optional(),
    top: ZEParticleOutMode.optional(),
  }),
  ZEParticleOutMode,
])

export const ZParticleMove = z.object({
  speed: z.number().optional(),
  size: z.boolean().optional(),
  random: z.boolean().optional(),
  direction: ZEParticleMoveDirections.optional(),
  outModes: ZParticleMoveOutModes.optional(),
})

export const ZParticleNumberLimit = z.union([
  z.object({
    mode: ZEParticleLimitAction.optional(),
    value: z.number(),
  }),
  z.number(),
])

export const ZParticleNumber = z.object({
  value: z.number(),
  density: z.boolean().optional(),
  limit: ZParticleNumberLimit.optional(),
})

export const ZParticleImageShape = z.object({
  type: z.literal('image'),
  src: z.string(),
  width: z.number(),
  height: z.number(),
})

export const ZParticleCircleShape = z.object({
  type: z.literal('circle'),
})

export const ZParticleShape = z.union([ZParticleCircleShape, ZParticleImageShape])

export const ZParticleProperty = z.object({
  value: ZParticleValue,
  animation: z
    .object({
      count: z.number().optional(),
      speed: ZParticleValue.optional(),
      decay: z.number().optional(),
      delay: ZParticleValue.optional(),
      mode: ZEParticleAnimationMode.optional(),
      startValue: ZEParticleAnimationStart.optional(),
      destroy: ZEParticleAnimationDestroy.optional(),
    })
    .optional(),
})

export const ZParticles = z.object({
  shape: ZParticleShape.optional(),
  number: z.union([ZParticleNumber, z.number()]).optional(),
  move: z.union([ZParticleMove, z.boolean()]).optional(),
  gravity: z.union([ZParticleMoveGravity, z.number()]).optional(),
  size: z.union([ZParticleProperty, z.number()]).optional(),
  opacity: z.union([ZParticleProperty, z.number()]).optional(),
  collisions: z.union([ZParticleCollisions, ZEParticleCollisionMode]).optional(),
  colors: z.array(z.string()).optional(),
})

export const ZParticleAutoPush = z.union([
  z.object({
    quantity: z.number().optional(),
    mode: ZParticleAutoPushMode,
  }),
  ZParticleAutoPushMode,
])

export const ZParticleProps = z.object({
  id: z.string(),
  autoPlay: z.boolean().optional(),
  particles: ZParticles,
  delay: ZParticleValue.optional(),
  autoPush: ZParticleAutoPush.optional(),
  fullScreen: z.boolean().optional(),
  mouseRepulse: z.union([z.number(), z.boolean()]).optional(),
  clickPush: z.union([ZParticleValue, z.boolean()]).optional(),
})

//
//
//

export type TParticleValue = z.infer<typeof ZParticleValue>
export type TParticleAutoPushMode = z.infer<typeof ZParticleAutoPushMode>
export type TParticleCanvasProps = z.infer<typeof ZParticleCanvasProps>
export type TParticleCollisions = z.infer<typeof ZParticleCollisions>
export type TParticleMoveGravity = z.infer<typeof ZParticleMoveGravity>
export type TParticleMoveOutModes = z.infer<typeof ZParticleMoveOutModes>
export type TParticleMove = z.infer<typeof ZParticleMove>
export type TParticleNumberLimit = z.infer<typeof ZParticleNumberLimit>
export type TParticleNumber = z.infer<typeof ZParticleNumber>
export type TParticleShape = z.infer<typeof ZParticleShape>
export type TParticleProperty = z.infer<typeof ZParticleProperty>
export type TParticles = z.infer<typeof ZParticles>
export type TParticleAutoPush = z.infer<typeof ZParticleAutoPush>
export type TParticleProps = z.infer<typeof ZParticleProps>
