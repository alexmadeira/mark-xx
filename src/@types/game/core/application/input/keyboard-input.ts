import type { ICommandQueue } from '@GAMETypes/interfaces/core/application/command'

import { z } from 'zod/v4'

export const ZKeyboardInputSetEventActionProps = z.tuple([z.custom<KeyboardEvent>()])

export function ZKeyboardInputMap<T>() {
  return z.record(z.string(), z.custom<T>())
}
export function ZKeyboardInputProps<T>() {
  return z.object({
    queue: z.custom<ICommandQueue<T>>().optional(),
    queueLimit: z.number().optional(),
  })
}

//
//
//
//

export type TKeyboardInputMap<T> = z.inferGeneric<typeof ZKeyboardInputMap<T>>
export type TKeyboardInputProps<T> = z.inferGeneric<typeof ZKeyboardInputProps<T>>
export type TKeyboardInputSetEventActionProps = z.infer<typeof ZKeyboardInputSetEventActionProps>
