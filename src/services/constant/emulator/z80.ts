export const Z80_CPU_REGISTER_8 = ['a', 'b', 'c', 'd', 'e', 'h', 'l'] as const
export const Z80_CPU_REGISTER_16 = ['bc', 'de', 'hl', 'sp'] as const
export const Z80_CPU_MEMORY_PAIRS = ['bc', 'de'] as const
export const Z80_CPU_STACK_REGISTERS = ['af', 'bc', 'de', 'hl'] as const
export const Z80_CPU_ALU_LOGICAL_OPERATIONS = ['and', 'or', 'xor', 'cp'] as const
export const Z80_CPU_ALU_ARITHMETIC_OPERATIONS = ['add', 'sub'] as const
export const Z80_CPU_CB_INSTRUCTION_ROTATE_OPERATIONS = ['rlc', 'rrc', 'rl', 'rr', 'sla', 'sra', 'srl'] as const
export const Z80_CPU_ALU_OPERATIONS = [...Z80_CPU_ALU_LOGICAL_OPERATIONS, ...Z80_CPU_ALU_ARITHMETIC_OPERATIONS] as const
