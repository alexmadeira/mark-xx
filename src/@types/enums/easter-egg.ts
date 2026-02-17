import { z } from 'zod'

import {
  EASTERE_EGG_ALL_KEYS,
  EASTERE_EGG_FUNCTION_KEYS,
  EASTERE_EGG_LETTER_KEYS,
  EASTERE_EGG_NUMBER_KEYS,
  EASTERE_EGG_NUMPAD_KEYS,
  EASTERE_EGG_SPECIAL_KEYS,
  EASTERE_EGG_STATUS,
  EASTERE_EGG_SYMBOL_KEYS,
} from '_SRV/constant/easter-egg'

export const ZEEasterEggStatus = z.enum(EASTERE_EGG_STATUS)
export const ZEEasterEggLetterKey = z.enum(EASTERE_EGG_LETTER_KEYS)
export const ZEEasterEggNumberKey = z.enum(EASTERE_EGG_NUMBER_KEYS)
export const ZEEasterEggNumpadKey = z.enum(EASTERE_EGG_NUMPAD_KEYS)
export const ZEEasterEggSynbolKey = z.enum(EASTERE_EGG_SYMBOL_KEYS)
export const ZEEasterEggSpecialKey = z.enum(EASTERE_EGG_SPECIAL_KEYS)
export const ZEEasterEggFunctionKey = z.enum(EASTERE_EGG_FUNCTION_KEYS)
export const ZEEasterEggAllKey = z.enum(EASTERE_EGG_ALL_KEYS)

//
//
//
//

export type TEEasterEggStatus = z.infer<typeof ZEEasterEggStatus>
export type TEEasterEggLetterKey = z.infer<typeof ZEEasterEggLetterKey>
export type TEEasterEggNumberKey = z.infer<typeof ZEEasterEggNumberKey>
export type TEEasterEggNumpadKey = z.infer<typeof ZEEasterEggNumpadKey>
export type TEEasterEggSynbolKey = z.infer<typeof ZEEasterEggSynbolKey>
export type TEEasterEggSpecialKey = z.infer<typeof ZEEasterEggSpecialKey>
export type TEEasterEggFunctionKey = z.infer<typeof ZEEasterEggFunctionKey>
export type TEEasterEggAllKey = z.infer<typeof ZEEasterEggAllKey>
