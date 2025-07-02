/**
 * Make some property nullish on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Nullish<Post>
 * ```
 **/
export type Nullish<T> = null | undefined | T
