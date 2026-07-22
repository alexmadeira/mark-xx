import { Z80TraceEntry } from '_EMU/core/value-object/z80-trace-entry'

import { makeZ80TraceEntry } from '_TEST/utils/factories/emulator/make-z80-trace-entry'

describe('Emulator', () => {
  describe('Value Object', () => {
    describe('Z80TraceEntry', () => {
      describe('Create', () => {
        it('should create a Z80 trace entry', () => {
          const result = Z80TraceEntry.create({
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
            cycles: 4,
            opcode: 0xcb,
          })

          expect(result).toBeInstanceOf(Z80TraceEntry)
        })
      })

      describe('Accessors', () => {
        it('should expose the trace data', () => {
          const entry = makeZ80TraceEntry()

          expect(entry.a).toBeDefined()
          expect(entry.f).toBeDefined()
          expect(entry.b).toBeDefined()
          expect(entry.c).toBeDefined()
          expect(entry.d).toBeDefined()
          expect(entry.e).toBeDefined()
          expect(entry.h).toBeDefined()
          expect(entry.l).toBeDefined()
          expect(entry.sp).toBeDefined()
          expect(entry.pc).toBeDefined()
          expect(entry.cycles).toBeDefined()
          expect(entry.opcode).toBeDefined()
        })
      })

      describe('To JSON', () => {
        it('should serialize the trace data', () => {
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
            cycles: 4,
            opcode: 0xcb,
          }

          const result = makeZ80TraceEntry(traceData)

          expect(result.toJSON()).toMatchObject(traceData)
        })
      })

      describe('Is Same', () => {
        it('should return true when another trace entry has equal data', () => {
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
            cycles: 4,
            opcode: 0xcb,
          }

          const entry = makeZ80TraceEntry(traceData)
          const equalEntry = makeZ80TraceEntry(traceData)

          expect(entry.isSame(equalEntry)).toBe(true)
        })
        it('should return true when serialized trace data is equal', () => {
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
            cycles: 4,
            opcode: 0xcb,
          }

          const entry = makeZ80TraceEntry(traceData)

          expect(entry.isSame(traceData)).toEqual(true)
        })
        it('should return false when another trace entry has different data', () => {
          const entry = makeZ80TraceEntry({ cycles: 2 })
          const differentEntry = makeZ80TraceEntry({ cycles: 8 })

          expect(entry.isSame(differentEntry)).toBe(false)
        })
        it('should return false when serialized trace data is different', () => {
          const entry = makeZ80TraceEntry({ opcode: 0x02 })
          const differentData = { ...entry.toJSON(), opcode: 0x00 }

          expect(entry.isSame(differentData)).toEqual(false)
        })
      })
    })
  })
})
