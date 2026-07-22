import type { TZ80TraceEntryCreateProps } from '@/emulator/core/value-object/z80-trace-entry'

import { Z80_CYCLES } from '_EMU/constants/z80'
import { Z80TraceEntry } from '_EMU/core/value-object/z80-trace-entry'
import { faker } from '@faker-js/faker'

export function makeZ80TraceEntry(overrides: Partial<TZ80TraceEntryCreateProps> = {}) {
  return Z80TraceEntry.create({
    a: faker.number.int({ min: 0x00, max: 0xff }),
    f: faker.number.int({ min: 0x00, max: 0xff }),
    b: faker.number.int({ min: 0x00, max: 0xff }),
    c: faker.number.int({ min: 0x00, max: 0xff }),
    d: faker.number.int({ min: 0x00, max: 0xff }),
    e: faker.number.int({ min: 0x00, max: 0xff }),
    h: faker.number.int({ min: 0x00, max: 0xff }),
    l: faker.number.int({ min: 0x00, max: 0xff }),
    sp: faker.number.int({ min: 0x0000, max: 0xffff }),
    pc: faker.number.int({ min: 0x0000, max: 0xffff }),
    cycles: faker.helpers.arrayElement(Object.values(Z80_CYCLES)),
    opcode: faker.number.int({ min: 0x00, max: 0xff }),
    ...overrides,
  })
}
