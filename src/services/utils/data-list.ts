import _ from 'lodash'

export class DataList<T> extends Array<T> {
  constructor(initialItems?: T[]) {
    const size = _.isNumber(initialItems) ? initialItems : initialItems?.length ?? 0
    super(size)

    if (_.isArray(initialItems)) this.push(...initialItems)
  }

  private isDataList(data: unknown) {
    return !!(data instanceof DataList)
  }

  public add(data: T | T[] | DataList<T>) {
    if (this.isDataList(data)) this.push(...data)
    if (!this.isDataList(data)) this.push(..._.castArray(data))

    return this as Omit<DataList<T>, 'set'>
  }

  public set(data: T | T[] | DataList<T> = []) {
    this.clear()

    if (this.isDataList(data)) this.push(...data)
    if (!this.isDataList(data)) this.push(..._.concat([], data))

    return this as Omit<DataList<T>, 'set'>
  }

  public remove(index: number | number[]) {
    _.pullAt(this, _.concat([], index))

    return this as Omit<DataList<T>, 'remove' | 'set'>
  }

  public clear() {
    this.length = 0

    return this as Omit<DataList<T>, 'clear' | 'set'>
  }
}
