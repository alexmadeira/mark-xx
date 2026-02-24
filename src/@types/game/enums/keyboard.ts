import { z } from 'zod'

import {
  KEYBOARD_ALL_KEYS,
  KEYBOARD_ARROW_KEYS,
  KEYBOARD_FUNCTION_KEYS,
  KEYBOARD_LETTER_KEYS,
  KEYBOARD_NUMBER_KEYS,
  KEYBOARD_SPECIAL_KEYS,
  KEYBOARD_SYMBOL_KEYS,
} from '~/game/constants/keyboard'

export const ZEkeyboardAllKey = z.enum(KEYBOARD_ALL_KEYS)
export const ZEkeyboardNumberKey = z.enum(KEYBOARD_NUMBER_KEYS)
export const ZEkeyboardArrowKey = z.enum(KEYBOARD_ARROW_KEYS)
export const ZEkeyboardSynbolKey = z.enum(KEYBOARD_SYMBOL_KEYS)
export const ZEkeyboardLetterKey = z.enum(KEYBOARD_LETTER_KEYS)
export const ZEkeyboardSpecialKey = z.enum(KEYBOARD_SPECIAL_KEYS)
export const ZEkeyboardFunctionKey = z.enum(KEYBOARD_FUNCTION_KEYS)

//
//
//
//

export type TEkeyboardAllKey = z.infer<typeof ZEkeyboardAllKey>
export type TEkeyboardNumberKey = z.infer<typeof ZEkeyboardNumberKey>
export type TEkeyboardArrowKey = z.infer<typeof ZEkeyboardArrowKey>
export type TEkeyboardSynbolKey = z.infer<typeof ZEkeyboardSynbolKey>
export type TEkeyboardLetterKey = z.infer<typeof ZEkeyboardLetterKey>
export type TEkeyboardSpecialKey = z.infer<typeof ZEkeyboardSpecialKey>
export type TEkeyboardFunctionKey = z.infer<typeof ZEkeyboardFunctionKey>
