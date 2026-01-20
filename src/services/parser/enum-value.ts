import type { Nullish } from '@/utils/nullish'

export abstract class EnumValue<TCode extends string, TValue> {
  protected constructor(
    private readonly parseCode: Nullish<TCode>,
    private readonly parseValues: Record<TCode, TValue>,
  ) {}

  public get code() {
    return this.parseCode
  }

  public get value() {
    if (!this.parseCode) return
    return this.parseValues[this.parseCode]
  }
}
