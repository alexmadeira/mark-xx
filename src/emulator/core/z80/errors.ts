import { Z80Byte } from './byte'

const bytePresenter = new Z80Byte()

export class Z80OpcodeNotImplementedError extends Error {
  constructor(opcode: number, pc: number) {
    super(
      `Z80 opcode not implemented: 0x${bytePresenter.toHex(bytePresenter.toByte(opcode), 2)} at PC 0x${bytePresenter.toHex(bytePresenter.toWord(pc), 4)}`,
    )
    this.name = 'Z80OpcodeNotImplementedError'
  }
}
