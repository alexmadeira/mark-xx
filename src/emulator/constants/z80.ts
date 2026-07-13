export const Z80_MEMORY = {
  size: 0x10000,
} as const

export const Z80_FLAG = {
  sign: 0x80,
  zero: 0x40,
  halfCarry: 0x10,
  parityOverflow: 0x04,
  subtract: 0x02,
  carry: 0x01,
} as const

export const Z80_CYCLES = {
  callNN: 17,
  halt: 4,
  incDecR: 4,
  jpNN: 10,
  ldAHL: 7,
  ldHLA: 7,
  ldRN: 7,
  ldRR: 4,
  ldRRNN: 10,
  nop: 4,
  ret: 10,
} as const
