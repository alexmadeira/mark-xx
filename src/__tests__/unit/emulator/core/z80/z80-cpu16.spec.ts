import { Z80CPU16 } from '_EMU/core/z80/cpu/cpu16'

import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let byte: Z80ByteMock
let cpu8: Z80CPU8Mock
let state: Z80StateMock

let sut: Z80CPU16

describe('Emulator', () => {
  beforeEach(() => {
    byte = new Z80ByteMock()
    cpu8 = new Z80CPU8Mock()
    state = new Z80StateMock()

    sut = new Z80CPU16(byte, cpu8, state)
  })

  describe('Core', () => {
    describe('Z80 CPU 16-bit', () => {
      describe('Fetch', () => {
        it('should fetch the low and high bytes and combine them as a word', () => {
          cpu8.fetch.mockReturnValueOnce(0x34).mockReturnValueOnce(0x12)

          const result = sut.fetch()

          expect(result).toBe(0x1234)
          expect(cpu8.fetch).toHaveBeenCalledTimes(2)
          expect(byte.makeWord).toHaveBeenCalledOnce()
          expect(byte.makeWord).toHaveBeenCalledWith(0x34, 0x12)
        })
      })
      describe('Push', () => {
        it('should normalize the word and push its high and low bytes with stack pre-decrement', () => {
          state.sp = 0x0000

          sut.push(0x12345)

          expect(state.sp).toBe(0xfffe)

          expect(byte.toWord).toHaveBeenNthCalledWith(1, 0x12345)
          expect(byte.toWord).toHaveBeenNthCalledWith(2, -1)
          expect(byte.toWord).toHaveBeenNthCalledWith(3, 0xfffe)
          expect(byte.getLowByte).toHaveBeenCalledWith(0x2345)
          expect(byte.getHighByte).toHaveBeenCalledWith(0x2345)

          expect(cpu8.write).toHaveBeenNthCalledWith(1, 0xffff, 0x23)
          expect(cpu8.write).toHaveBeenNthCalledWith(2, 0xfffe, 0x45)
        })
      })
      describe('Pop', () => {
        it('should pop the low and high bytes with stack post-increment and combine them', () => {
          state.sp = 0xffff
          cpu8.read.mockReturnValueOnce(0x34).mockReturnValueOnce(0x12)

          const result = sut.pop()

          expect(result).toBe(0x1234)

          expect(state.sp).toBe(0x0001)

          expect(byte.toWord).toHaveBeenNthCalledWith(1, 0x10000)
          expect(byte.toWord).toHaveBeenNthCalledWith(2, 0x0001)
          expect(byte.makeWord).toHaveBeenCalledWith(0x34, 0x12)

          expect(cpu8.read).toHaveBeenNthCalledWith(1, 0xffff)
          expect(cpu8.read).toHaveBeenNthCalledWith(2, 0x0000)
        })
      })
    })
  })
})
