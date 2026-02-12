import { z } from 'zod/v4'

export const ZMouseHTMLElement = z.custom<HTMLElement>().nullish()

export const ZMouseSetElementProps = z.tuple([z.string(), ZMouseHTMLElement])

export const ZMouseProps = z.object({})

//
//
//

export type TMouseHTMLElement = z.infer<typeof ZMouseHTMLElement>

export type TMouseSetElementProps = z.infer<typeof ZMouseSetElementProps>
export type TMouseProps = z.infer<typeof ZMouseProps>
