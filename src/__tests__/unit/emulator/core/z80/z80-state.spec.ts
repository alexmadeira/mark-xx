import { Z80State } from '_EMU/core/z80/state'

import { accessorCases, wordRegisterCases } from '_TEST/utils/setup/emulator/z80'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'

let byte: Z80ByteMock
let sut: Z80State

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    sut = new Z80State(byte)
  })

  describe('Core', () => {
    describe('Z80 State', () => {
      describe('Constructor', () => {
        it('should expose the default state', () => {
          expect(sut).toMatchObject({
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            h: 0,
            i: 0,
            l: 0,
            r: 0,
            ix: 0,
            iy: 0,
            sp: 0xffff,
            pc: 0x0000,
            iff1: false,
            iff2: false,
            shadowA: 0,
            shadowB: 0,
            shadowC: 0,
            shadowD: 0,
            shadowE: 0,
            shadowF: 0,
            shadowH: 0,
            shadowL: 0,
            halted: false,
            interruptMode: 0,
          })
        })
        it('should expose the configured initial state', () => {
          sut = new Z80State(byte, { state: { a: 0x42, pc: 0x1234, halted: true } })

          expect(sut.a).toBe(0x42)
          expect(sut.pc).toBe(0x1234)
          expect(sut.halted).toBe(true)
          expect(sut).toMatchObject({
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            h: 0,
            i: 0,
            l: 0,
            r: 0,
            ix: 0,
            iy: 0,
            sp: 0xffff,
            iff1: false,
            iff2: false,
            shadowA: 0,
            shadowB: 0,
            shadowC: 0,
            shadowD: 0,
            shadowE: 0,
            shadowF: 0,
            shadowH: 0,
            shadowL: 0,
            interruptMode: 0,
          })
        })
      })
      describe('Accessors', () => {
        it.each(accessorCases)('should write and read $property', ({ property, value }) => {
          Object.assign(sut, { [property]: value })

          expect(sut[property]).toBe(value)
        })
      })
      describe('Word Registers', () => {
        it.each(wordRegisterCases)('should split and combine the $register register', ({ register, high, low }) => {
          Object.assign(sut, { [register]: 0x12345 })

          expect(byte.toWord).toHaveBeenNthCalledWith(1, 0x12345)
          expect(byte.getHighByte).toHaveBeenCalledWith(0x2345)
          expect(byte.getLowByte).toHaveBeenCalledWith(0x2345)
          expect(sut[high]).toBe(0x23)
          expect(sut[low]).toBe(0x45)
          expect(sut[register]).toBe(0x2345)
          expect(byte.toWord).toHaveBeenNthCalledWith(2, 0x2345)
        })
      })
      describe('Reset', () => {
        it('should restore the configured initial state', () => {
          sut = new Z80State(byte, { state: { a: 0x42, pc: 0x1234, iff1: true } })
          sut.a = 0xff
          sut.pc = 0xffff
          sut.iff1 = false
          sut.halted = true

          sut.reset()

          expect(sut.a).toBe(0x42)
          expect(sut.pc).toBe(0x1234)
          expect(sut.iff1).toBe(true)

          expect(sut).toMatchObject({
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            h: 0,
            i: 0,
            l: 0,
            r: 0,
            ix: 0,
            iy: 0,
            sp: 0xffff,
            iff2: false,
            shadowA: 0,
            shadowB: 0,
            shadowC: 0,
            shadowD: 0,
            shadowE: 0,
            shadowF: 0,
            shadowH: 0,
            shadowL: 0,
            halted: false,
          })
        })
      })
    })
  })
})
