import { Z80TraceEntry } from '_EMU/core/value-object/z80-trace-entry'

const traceData = {
  a: 0x01,
  f: 0x02,
  b: 0x03,
  c: 0x04,
  d: 0x05,
  e: 0x06,
  h: 0x07,
  l: 0x08,
  sp: 0x1234,
  pc: 0x5678,
  opcode: 0xcb,
  cycles: 4,
}

function createEntry(overrides: Partial<typeof traceData> = {}) {
  return Z80TraceEntry.create({ ...traceData, ...overrides })
}

describe('Emulator', () => {
  describe('Value Object', () => {
    describe('Z80TraceEntry', () => {
      describe('Create', () => {
        it('should create a Z80 trace entry', () => {
          expect(createEntry()).toBeInstanceOf(Z80TraceEntry)
        })
      })

      describe('Accessors', () => {
        it('should expose the trace data', () => {
          const entry = createEntry()

          expect({
            a: entry.a,
            f: entry.f,
            b: entry.b,
            c: entry.c,
            d: entry.d,
            e: entry.e,
            h: entry.h,
            l: entry.l,
            sp: entry.sp,
            pc: entry.pc,
            opcode: entry.opcode,
            cycles: entry.cycles,
          }).toEqual(traceData)
        })
      })

      describe('To JSON', () => {
        it('should serialize the trace data', () => {
          const entry = createEntry()

          expect(entry.toJSON()).toEqual(traceData)
          expect(entry.toJSON()).not.toBe(traceData)
        })
      })

      describe('Is Same', () => {
        it('should return false when another trace entry has different data', () => {
          const entry = createEntry()
          const differentEntry = createEntry({ cycles: 8 })

          expect(entry.isSame(differentEntry)).toBe(false)
        })

        it('should return false when serialized trace data is different', () => {
          const entry = createEntry()
          const differentData = { ...traceData, opcode: 0x00 }

          expect(entry.isSame(differentData)).toBe(false)
        })
      })
    })
  })
})
