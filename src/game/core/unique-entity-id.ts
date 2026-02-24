import _ from 'lodash'

export class UniqueEntityID {
  private readonly value: string

  constructor(value?: string) {
    this.value = value ?? _.uniqueId()
  }

  public toString() {
    return this.value
  }

  public toValue() {
    return this.value
  }

  public equals(id: UniqueEntityID | string) {
    if (id instanceof UniqueEntityID) {
      return id.toValue() === this.value
    }

    return id === this.value
  }
}
