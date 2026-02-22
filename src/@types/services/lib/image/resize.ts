import type { Nullish } from '@/utils/nullish'

export type TResizeSize = {
  width?: number | string
  height?: number | string
}
export type TResizeImage = string | HTMLImageElement

export type TResizeSizes = Record<string, TResizeSize>
export type TResizeResized<TSizes extends TResizeSizes> = Record<keyof TSizes, Nullish<string>>

export interface IResize<TSizes extends TResizeSizes> {
  resize(image?: TResizeImage): TResizeResized<TSizes>
}
