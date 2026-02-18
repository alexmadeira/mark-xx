import type { TParticleProps } from '@/services/builder/particle'

import _ from 'lodash'

const configAboutParticles = {
  id: 'about',
  fullScreen: false,
  autoPlay: true,
  autoPush: {
    mode: 'random',
    quantity: 2,
  },
  particles: {
    collisions: 'bounce',
    gravity: 0.04,
    shape: {
      type: 'circle',
    },
    number: {
      value: 3,
      density: true,
      limit: {
        value: 10,
        mode: 'wait',
      },
    },
    move: {
      speed: 10,
      direction: 'none',
      size: true,
      outModes: 'bounce',
    },
    opacity: {
      value: {
        min: 0,
        max: 1,
      },
      animation: {
        mode: 'decrease',
        startValue: 'max',
        speed: {
          min: 0.2,
          max: 1.5,
        },
        destroy: 'min',
      },
    },
    size: {
      value: {
        min: 0,
        max: 1000,
      },
      animation: {
        count: 1,
        speed: {
          min: 50,
          max: 200,
        },
        mode: 'increase',
        startValue: 'min',
      },
    },
  },
} satisfies TParticleProps

export const configParticles = {
  about: configAboutParticles,
}
