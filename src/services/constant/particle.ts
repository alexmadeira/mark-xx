export const PARTICLE_LIMIT_ACTION = ['wait', 'delete'] as const

export const PARTICLE_OUT_MODES = ['none', 'bounce', 'destroy', 'out'] as const
export const PARTICLE_COLLISION_MODES = ['absorb', 'bounce', 'destroy'] as const
export const PARTICLE_MOVE_DIRECTIONS = [
  'none',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
  'top-left',
] as const
export const PARTICLE_ANIMATION_MODES = ['random', 'increase', 'decrease', 'auto'] as const
export const PARTICLE_ANIMATION_START = ['random', 'min', 'max'] as const
export const PARTICLE_ANIMATION_DESTROY = ['none', 'min', 'max'] as const
export const PARTICLE_AUTO_PUSH_MODES = ['empty', 'random'] as const
