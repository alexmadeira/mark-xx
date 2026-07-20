import { z } from 'zod/v4'

export const ZZ80ByteToHexProps = z.tuple([z.number(), z.number()])
export const ZZ80ByteToByteProps = z.tuple([z.number()])
export const ZZ80ByteToWordProps = z.tuple([z.number()])
export const ZZ80ByteMakeWordProps = z.tuple([z.number(), z.number()])
export const ZZ80ByteSignedByteProps = z.tuple([z.number()])
export const ZZ80ByteGetLowByteProps = z.tuple([z.number()])
export const ZZ80ByteGetHighByteProps = z.tuple([z.number()])

export const ZZ80ByteToHex = z.custom<(...props: z.infer<typeof ZZ80ByteToHexProps>) => string>()
export const ZZ80ByteToByte = z.custom<(...props: z.infer<typeof ZZ80ByteToByteProps>) => number>()
export const ZZ80ByteToWord = z.custom<(...props: z.infer<typeof ZZ80ByteToWordProps>) => number>()
export const ZZ80ByteMakeWord = z.custom<(...props: z.infer<typeof ZZ80ByteMakeWordProps>) => number>()
export const ZZ80ByteSignedByte = z.custom<(...props: z.infer<typeof ZZ80ByteSignedByteProps>) => number>()
export const ZZ80ByteGetLowByte = z.custom<(...props: z.infer<typeof ZZ80ByteGetLowByteProps>) => number>()
export const ZZ80ByteGetHighByte = z.custom<(...props: z.infer<typeof ZZ80ByteGetHighByteProps>) => number>()

export const ZZ80Byte = z.object({
  toHex: ZZ80ByteToHex,
  toByte: ZZ80ByteToByte,
  toWord: ZZ80ByteToWord,
  makeWord: ZZ80ByteMakeWord,
  signedByte: ZZ80ByteSignedByte,
  getLowByte: ZZ80ByteGetLowByte,
  getHighByte: ZZ80ByteGetHighByte,
})

export const ZZ80ByteCreate = z.custom<() => z.infer<typeof ZZ80Byte>>()

//
//
//

export type TZ80ByteToHexProps = z.infer<typeof ZZ80ByteToHexProps>
export type TZ80ByteToByteProps = z.infer<typeof ZZ80ByteToByteProps>
export type TZ80ByteToWordProps = z.infer<typeof ZZ80ByteToWordProps>
export type TZ80ByteMakeWordProps = z.infer<typeof ZZ80ByteMakeWordProps>
export type TZ80ByteSignedByteProps = z.infer<typeof ZZ80ByteSignedByteProps>
export type TZ80ByteGetLowByteProps = z.infer<typeof ZZ80ByteGetLowByteProps>
export type TZ80ByteGetHighByteProps = z.infer<typeof ZZ80ByteGetHighByteProps>

export type TZ80ByteToHex = z.infer<typeof ZZ80ByteToHex>
export type TZ80ByteToByte = z.infer<typeof ZZ80ByteToByte>
export type TZ80ByteToWord = z.infer<typeof ZZ80ByteToWord>
export type TZ80ByteMakeWord = z.infer<typeof ZZ80ByteMakeWord>
export type TZ80ByteSignedByte = z.infer<typeof ZZ80ByteSignedByte>
export type TZ80ByteGetLowByte = z.infer<typeof ZZ80ByteGetLowByte>
export type TZ80ByteGetHighByte = z.infer<typeof ZZ80ByteGetHighByte>

export type TZ80ByteCreate = z.infer<typeof ZZ80ByteCreate>
export interface IZ80Byte extends z.infer<typeof ZZ80Byte> {}
