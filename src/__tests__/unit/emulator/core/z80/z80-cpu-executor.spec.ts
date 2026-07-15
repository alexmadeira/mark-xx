import { Z80_CYCLES, Z80_FLAG } from '_EMU/constants/z80'
import { Z80CPUExecutor } from '_EMU/core/z80/cpu/executor'
import { Z80OpcodeNotImplementedError } from '_EMU/core/z80/errors'

import {
  addHLRegisterPairCases,
  aluArithmeticHLCases,
  aluArithmeticOpcodeFamilies,
  aluArithmeticRegisterCases,
  aluLogicHLCases,
  aluLogicOpcodeFamilies,
  aluLogicRegisterLoCases,
  conditionalOpcodeCases,
  decrement16Cases,
  decrementCases,
  hlFromRegisterLoadCases,
  immediateLoadCases,
  increment16Cases,
  incrementCases,
  registerFromHLLoadCases,
  registerLoadCases,
  relativeConditionalOpcodeCases,
  stackRegisterPairCases,
  wordLoadCases,
} from '_TEST/utils/setup/emulator/z80'
import { Z80CPUAluMock } from '_TEST/utils/stubs/emulator/z80/fake-alu'
import { Z80ByteMock } from '_TEST/utils/stubs/emulator/z80/fake-byte'
import { Z80CPURegisterMock } from '_TEST/utils/stubs/emulator/z80/fake-cpu-register'
import { Z80CPU16Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu16'
import { Z80CPU8Mock } from '_TEST/utils/stubs/emulator/z80/fake-cpu8'
import { Z80FlagMock } from '_TEST/utils/stubs/emulator/z80/fake-flag'
import { Z80StateMock } from '_TEST/utils/stubs/emulator/z80/fake-state'

let alu: Z80CPUAluMock
let flag: Z80FlagMock
let byte: Z80ByteMock
let cpu8: Z80CPU8Mock
let cpu16: Z80CPU16Mock
let state: Z80StateMock
let register: Z80CPURegisterMock

let sut: Z80CPUExecutor

describe('Emulator', () => {
  beforeEach(() => {
    alu = new Z80CPUAluMock()
    byte = new Z80ByteMock()
    flag = new Z80FlagMock()
    state = new Z80StateMock()
    cpu8 = new Z80CPU8Mock(state)
    cpu16 = new Z80CPU16Mock(cpu8, state)
    register = new Z80CPURegisterMock(state)

    sut = new Z80CPUExecutor(alu, byte, flag, cpu8, cpu16, state, register)
  })

  describe('Core', () => {
    describe('Z80 CPU Executor', () => {
      describe('Control', () => {
        it('should execute NOP', () => {
          const result = sut.executeOpcode(0x00)

          expect(result).toBe(Z80_CYCLES.nop)
        })
        it('should halt the CPU', () => {
          const result = sut.executeOpcode(0x76)

          expect(result).toBe(Z80_CYCLES.halt)
          expect(state.halted).toBe(true)
        })
        it('should reject an unsupported opcode', () => {
          state.pc = 0x1234

          expect(() => sut.executeOpcode(0xff, 0x1233)).toThrow(new Z80OpcodeNotImplementedError(0xff, 0x1233))
        })
      })
      describe('8-bit loads', () => {
        it.each(registerLoadCases)(
          'should execute opcode $opcode by loading $source into $destination',
          ({ opcode, destination, source }) => {
            state[source] = 0x42

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRR)
            expect(state[destination]).toBe(0x42)
          },
        )
        it.each(registerFromHLLoadCases)(
          'should execute opcode $opcode by loading (HL) into $destination',
          ({ opcode, destination }) => {
            state.hl = 0x1234
            cpu8.read.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRegisterFromMemoryHL)
            expect(cpu8.read).toHaveBeenCalledWith(0x1234)
            expect(state[destination]).toBe(0x42)
          },
        )
        it.each(hlFromRegisterLoadCases)(
          'should execute opcode $opcode by loading $source into (HL)',
          ({ opcode, source }) => {
            state.hl = 0x1234
            state[source] = 0x42
            const address = state.hl

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldMemoryHLFromRegister)
            expect(cpu8.write).toHaveBeenCalledWith(address, 0x42)
          },
        )
        it.each(immediateLoadCases)(
          'should execute opcode $opcode by loading an immediate value into $expected',
          ({ opcode, expected }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(state[expected]).toBe(0x42)
          },
        )
        it('should load an immediate value into (HL)', () => {
          state.hl = 0x1234
          cpu8.fetch.mockReturnValueOnce(0x42)

          const result = sut.executeOpcode(0x36)

          expect(result).toBe(Z80_CYCLES.ldMemoryHLImmediate)
          expect(cpu8.write).toHaveBeenCalledWith(0x1234, 0x42)
        })
        it.each([
          { opcode: 0x02, register: 'bc' },
          { opcode: 0x12, register: 'de' },
        ] as const)('should execute opcode $opcode by loading A into ($register)', ({ opcode, register }) => {
          state[register] = 0x1234
          state.a = 0x42

          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.ldMemoryAtRegisterPairFromA)
          expect(cpu8.write).toHaveBeenCalledWith(0x1234, 0x42)
        })
        it.each([
          { opcode: 0x0a, register: 'bc' },
          { opcode: 0x1a, register: 'de' },
        ] as const)('should execute opcode $opcode by loading ($register) into A', ({ opcode, register }) => {
          state[register] = 0x1234
          cpu8.read.mockReturnValueOnce(0x42)

          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.ldAFromMemoryAtRegisterPair)
          expect(cpu8.read).toHaveBeenCalledWith(0x1234)
          expect(state.a).toBe(0x42)
        })
        it('should load A into an absolute address', () => {
          state.a = 0x42
          cpu16.fetch.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0x32)

          expect(result).toBe(Z80_CYCLES.ldAbsoluteMemoryFromA)
          expect(cpu8.write).toHaveBeenCalledWith(0x1234, 0x42)
        })
        it('should load A from an absolute address', () => {
          cpu16.fetch.mockReturnValueOnce(0x1234)
          cpu8.read.mockReturnValueOnce(0x42)

          const result = sut.executeOpcode(0x3a)

          expect(result).toBe(Z80_CYCLES.ldAFromAbsoluteMemory)
          expect(cpu8.read).toHaveBeenCalledWith(0x1234)
          expect(state.a).toBe(0x42)
        })
      })
      describe('16-bit loads', () => {
        it.each(wordLoadCases)(
          'should execute opcode $opcode by loading an immediate word into $expected',
          ({ opcode, expected }) => {
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.ldRRNN)
            expect(cpu16.fetch).toHaveBeenCalledOnce()
            expect(state[expected]).toBe(0x1234)
          },
        )
        it('should store HL at an absolute address in little-endian order with address wrapping', () => {
          state.hl = 0x1234
          cpu16.fetch.mockReturnValueOnce(0xffff)
          byte.toWord.mockReturnValueOnce(0x0000)
          byte.getLowByte.mockReturnValueOnce(0x34)
          byte.getHighByte.mockReturnValueOnce(0x12)

          const result = sut.executeOpcode(0x22)

          expect(result).toBe(Z80_CYCLES.ldAbsoluteMemoryFromHL)
          expect(cpu8.write).toHaveBeenNthCalledWith(1, 0xffff, 0x34)
          expect(cpu8.write).toHaveBeenNthCalledWith(2, 0x0000, 0x12)
        })
        it('should load HL from an absolute address in little-endian order with address wrapping', () => {
          cpu16.fetch.mockReturnValueOnce(0xffff)
          cpu8.read.mockReturnValueOnce(0x34).mockReturnValueOnce(0x12)
          byte.toWord.mockReturnValueOnce(0x0000)
          byte.makeWord.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0x2a)

          expect(result).toBe(Z80_CYCLES.ldHLFromAbsoluteMemory)
          expect(cpu8.read).toHaveBeenNthCalledWith(1, 0xffff)
          expect(cpu8.read).toHaveBeenNthCalledWith(2, 0x0000)
          expect(state.hl).toBe(0x1234)
        })
      })
      describe('Register arithmetic', () => {
        it.each(incrementCases)('should execute opcode $opcode by incrementing $expected', ({ opcode, expected }) => {
          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.incDecR)
          expect(register.increment).toHaveBeenCalledWith(expected)
        })
        it.each(decrementCases)('should execute opcode $opcode by decrementing $expected', ({ opcode, expected }) => {
          const result = sut.executeOpcode(opcode)

          expect(result).toBe(Z80_CYCLES.incDecR)
          expect(register.decrement).toHaveBeenCalledWith(expected)
        })
        it.each(increment16Cases)(
          'should execute opcode $opcode by incrementing $register with word wrapping and unchanged flags',
          ({ opcode, register }) => {
            state[register] = 0xffff
            state.f = 0xd7
            byte.toWord.mockReturnValueOnce(0x0000)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.incDecRegister16)
            expect(state[register]).toBe(0x0000)
            expect(state.f).toBe(0xd7)
          },
        )
        it.each(decrement16Cases)(
          'should execute opcode $opcode by decrementing $register with word wrapping and unchanged flags',
          ({ opcode, register }) => {
            state[register] = 0x0000
            state.f = 0xd7
            byte.toWord.mockReturnValueOnce(0xffff)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.incDecRegister16)
            expect(state[register]).toBe(0xffff)
            expect(state.f).toBe(0xd7)
          },
        )
        it.each(addHLRegisterPairCases)(
          'should execute opcode $opcode by adding $register to HL',
          ({ opcode, register }) => {
            state.hl = 0x1000
            if (register !== 'hl') state[register] = 0x0001
            byte.toWord
              .mockReturnValueOnce(0x1000)
              .mockReturnValueOnce(register === 'hl' ? 0x1000 : 0x0001)
              .mockReturnValueOnce(register === 'hl' ? 0x2000 : 0x1001)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.addHLRegisterPair)
            expect(state.hl).toBe(register === 'hl' ? 0x2000 : 0x1001)
          },
        )
        it('should set half-carry, clear subtract and preserve S/Z/PV when adding register pairs to HL', () => {
          state.hl = 0x0fff
          state.bc = 0x0001
          state.f = Z80_FLAG.sign | Z80_FLAG.zero | Z80_FLAG.parityOverflow | Z80_FLAG.subtract
          byte.toWord.mockReturnValueOnce(0x0fff).mockReturnValueOnce(0x0001).mockReturnValueOnce(0x1000)

          sut.executeOpcode(0x09)

          expect(state.hl).toBe(0x1000)
          expect(state.f).toBe(Z80_FLAG.sign | Z80_FLAG.zero | Z80_FLAG.parityOverflow | Z80_FLAG.subtract)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.subtract, false)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.carry, false)
        })
        it('should set carry and wrap a 16-bit ADD HL result', () => {
          state.hl = 0xffff
          state.bc = 0x0001
          byte.toWord.mockReturnValueOnce(0xffff).mockReturnValueOnce(0x0001).mockReturnValueOnce(0x0000)

          sut.executeOpcode(0x09)

          expect(state.hl).toBe(0x0000)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.halfCarry, true)
          expect(flag.set).toHaveBeenCalledWith(Z80_FLAG.carry, true)
        })
      })
      describe('Stack', () => {
        it.each(stackRegisterPairCases)(
          'should execute opcode $pushOpcode by pushing $register',
          ({ pushOpcode, register }) => {
            state[register] = 0x1234

            const result = sut.executeOpcode(pushOpcode)

            expect(result).toBe(Z80_CYCLES.pushRegisterPair)
            expect(cpu16.push).toHaveBeenCalledWith(0x1234)
          },
        )
        it.each(stackRegisterPairCases)(
          'should execute opcode $popOpcode by popping $register',
          ({ popOpcode, register }) => {
            cpu16.pop.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(popOpcode)

            expect(result).toBe(Z80_CYCLES.popRegisterPair)
            expect(cpu16.pop).toHaveBeenCalledOnce()
            expect(state[register]).toBe(0x1234)
          },
        )
      })
      describe('Program flow', () => {
        it('should jump to an immediate address', () => {
          cpu16.fetch.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xc3)

          expect(result).toBe(Z80_CYCLES.jpNN)
          expect(state.pc).toBe(0x1234)
        })
        it('should call an immediate address and push the return address', () => {
          state.pc = 0x5678
          cpu16.fetch.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xcd)

          expect(result).toBe(Z80_CYCLES.callNN)
          expect(cpu16.push).toHaveBeenCalledWith(0x5678)
          expect(state.pc).toBe(0x1234)
        })
        it('should return to the address popped from the stack', () => {
          cpu16.pop.mockReturnValueOnce(0x1234)

          const result = sut.executeOpcode(0xc9)

          expect(result).toBe(Z80_CYCLES.ret)
          expect(cpu16.pop).toHaveBeenCalledOnce()
          expect(state.pc).toBe(0x1234)
        })
        it.each(conditionalOpcodeCases)(
          'should take JP $name when its condition is met',
          ({ flag: flagValue, jpOpcode, takenFlag }) => {
            state.pc = 0x5678
            flag.hasFlag.mockReturnValueOnce(takenFlag)
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(jpOpcode)

            expect(result).toBe(Z80_CYCLES.jpConditional)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(state.pc).toBe(0x1234)
          },
        )
        it.each(conditionalOpcodeCases)(
          'should not take JP $name when its condition is not met',
          ({ flag: flagValue, jpOpcode, takenFlag }) => {
            state.pc = 0x5678
            flag.hasFlag.mockReturnValueOnce(!takenFlag)
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(jpOpcode)

            expect(result).toBe(Z80_CYCLES.jpConditional)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu16.fetch).toHaveBeenCalledOnce()
            expect(state.pc).toBe(0x5678)
          },
        )
        it.each(conditionalOpcodeCases)(
          'should take CALL $name and push the return address when its condition is met',
          ({ callOpcode, flag: flagValue, takenFlag }) => {
            state.pc = 0x5678
            flag.hasFlag.mockReturnValueOnce(takenFlag)
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(callOpcode)

            expect(result).toBe(Z80_CYCLES.callConditionalTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu16.push).toHaveBeenCalledWith(0x5678)
            expect(state.pc).toBe(0x1234)
          },
        )
        it.each(conditionalOpcodeCases)(
          'should not take CALL $name when its condition is not met',
          ({ callOpcode, flag: flagValue, takenFlag }) => {
            state.pc = 0x5678
            flag.hasFlag.mockReturnValueOnce(!takenFlag)
            cpu16.fetch.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(callOpcode)

            expect(result).toBe(Z80_CYCLES.callConditionalNotTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu16.fetch).toHaveBeenCalledOnce()
            expect(cpu16.push).not.toHaveBeenCalled()
            expect(state.pc).toBe(0x5678)
          },
        )
        it.each(conditionalOpcodeCases)(
          'should take RET $name when its condition is met',
          ({ flag: flagValue, retOpcode, takenFlag }) => {
            flag.hasFlag.mockReturnValueOnce(takenFlag)
            cpu16.pop.mockReturnValueOnce(0x1234)

            const result = sut.executeOpcode(retOpcode)

            expect(result).toBe(Z80_CYCLES.retConditionalTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu16.pop).toHaveBeenCalledOnce()
            expect(state.pc).toBe(0x1234)
          },
        )
        it.each(conditionalOpcodeCases)(
          'should not take RET $name when its condition is not met',
          ({ flag: flagValue, retOpcode, takenFlag }) => {
            state.pc = 0x5678
            flag.hasFlag.mockReturnValueOnce(!takenFlag)

            const result = sut.executeOpcode(retOpcode)

            expect(result).toBe(Z80_CYCLES.retConditionalNotTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu16.pop).not.toHaveBeenCalled()
            expect(state.pc).toBe(0x5678)
          },
        )
        it.each([
          { expected: 0x1005, offset: 0x05 },
          { expected: 0x0ffb, offset: 0xfb },
        ])('should jump relative with signed offset $offset', ({ expected, offset }) => {
          state.pc = 0x1000
          cpu8.fetch.mockReturnValueOnce(offset)
          byte.signedByte.mockReturnValueOnce(offset > 0x7f ? offset - 0x100 : offset)
          byte.toWord.mockReturnValueOnce(expected)

          const result = sut.executeOpcode(0x18)

          expect(result).toBe(Z80_CYCLES.jr)
          expect(byte.signedByte).toHaveBeenCalledWith(offset)
          expect(state.pc).toBe(expected)
        })
        it('should wrap the program counter for relative jumps', () => {
          state.pc = 0xfffe
          cpu8.fetch.mockReturnValueOnce(0x05)
          byte.signedByte.mockReturnValueOnce(0x05)
          byte.toWord.mockReturnValueOnce(0x0003)

          sut.executeOpcode(0x18)

          expect(state.pc).toBe(0x0003)
        })
        it.each(relativeConditionalOpcodeCases)(
          'should take JR $name when its condition is met',
          ({ flag: flagValue, opcode, takenFlag }) => {
            state.pc = 0x1000
            flag.hasFlag.mockReturnValueOnce(takenFlag)
            cpu8.fetch.mockReturnValueOnce(0x02)
            byte.signedByte.mockReturnValueOnce(0x02)
            byte.toWord.mockReturnValueOnce(0x1002)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.jrConditionalTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(state.pc).toBe(0x1002)
          },
        )
        it.each(relativeConditionalOpcodeCases)(
          'should not take JR $name when its condition is not met',
          ({ flag: flagValue, opcode, takenFlag }) => {
            state.pc = 0x1000
            flag.hasFlag.mockReturnValueOnce(!takenFlag)
            cpu8.fetch.mockReturnValueOnce(0x02)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.jrConditionalNotTaken)
            expect(flag.hasFlag).toHaveBeenCalledWith(flagValue)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(state.pc).toBe(0x1000)
          },
        )
        it('should decrement B and take DJNZ without changing flags', () => {
          state.b = 0x02
          state.f = 0xd7
          state.pc = 0x1000
          cpu8.fetch.mockReturnValueOnce(0xfe)
          byte.toByte.mockReturnValueOnce(0x01)
          byte.signedByte.mockReturnValueOnce(-0x02)
          byte.toWord.mockReturnValueOnce(0x0ffe)

          const result = sut.executeOpcode(0x10)

          expect(result).toBe(Z80_CYCLES.djnzTaken)
          expect(state.b).toBe(0x01)
          expect(state.f).toBe(0xd7)
          expect(state.pc).toBe(0x0ffe)
        })
        it('should decrement B and not take DJNZ when B reaches zero without changing flags', () => {
          state.b = 0x01
          state.f = 0xd7
          state.pc = 0x1000
          cpu8.fetch.mockReturnValueOnce(0xfe)
          byte.toByte.mockReturnValueOnce(0x00)

          const result = sut.executeOpcode(0x10)

          expect(result).toBe(Z80_CYCLES.djnzNotTaken)
          expect(state.b).toBe(0x00)
          expect(state.f).toBe(0xd7)
          expect(state.pc).toBe(0x1000)
        })
      })
      describe('ALU operations', () => {
        it.each(aluArithmeticRegisterCases)(
          'should execute arithmetic $operation with register $register for opcode $opcode',
          ({ opcode, operation, register, carry }) => {
            state[register] = 0x42
            const result = sut.executeOpcode(opcode)
            expect(result).toBe(Z80_CYCLES.aluR)
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicRegisterLoCases)(
          'should execute logic $operation with register $register for opcode $opcode',
          ({ opcode, operation, register }) => {
            state[register] = 0x42
            const result = sut.executeOpcode(opcode)
            expect(result).toBe(Z80_CYCLES.aluR)
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
        it.each(aluArithmeticHLCases)(
          'should execute arithmetic $operation with the value at HL for opcode $opcode',
          ({ opcode, operation, carry }) => {
            state.hl = 0x1234
            cpu8.read.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.aluHL)
            expect(cpu8.read).toHaveBeenCalledWith(0x1234)
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicHLCases)(
          'should execute logic $operation with the value at HL for opcode $opcode',
          ({ opcode, operation }) => {
            state.hl = 0x1234
            cpu8.read.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(opcode)

            expect(result).toBe(Z80_CYCLES.aluHL)
            expect(cpu8.read).toHaveBeenCalledWith(0x1234)
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
        it.each(aluArithmeticOpcodeFamilies)(
          'should execute arithmetic immediate $operation for opcode $immediate',
          ({ immediate, operation, carry }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(immediate)

            expect(result).toBe(Z80_CYCLES.aluN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(alu[operation]).toHaveBeenCalledWith(0x42, carry)
          },
        )
        it.each(aluLogicOpcodeFamilies)(
          'should execute logic immediate $operation for opcode $immediate',
          ({ immediate, operation }) => {
            cpu8.fetch.mockReturnValueOnce(0x42)

            const result = sut.executeOpcode(immediate)

            expect(result).toBe(Z80_CYCLES.aluN)
            expect(cpu8.fetch).toHaveBeenCalledOnce()
            expect(alu[operation]).toHaveBeenCalledWith(0x42)
          },
        )
      })
    })
  })
})
