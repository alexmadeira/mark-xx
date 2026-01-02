import type { z, ZodType } from 'zod/v4'

type ZodInferGeneric<TSchema extends () => ZodType> = z.infer<ReturnType<TSchema>>

declare module 'zod/v4' {
  namespace z {
    /**
     * Infers the TypeScript type from a schema factory function.
     *
     * @template TSchema
     * A zero-argument function that returns a Zod schema.
     *
     * @example
     * const schema = () => z.object({ value: z.number() });
     * type T = z.inferGeneric<typeof schema>;
     * // T = { value: number }
     */
    export type inferGeneric<TSchema extends () => ZodType> = z.infer<ReturnType<TSchema>>
  }
}
