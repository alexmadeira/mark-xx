import type { IPersister, TPersistData, TPersisterProps } from '@/services/lib/react-query/persister'

export class LocalStoragePersister implements IPersister {
  protected constructor(private readonly _props: TPersisterProps) {}

  static create(props: TPersisterProps) {
    return new LocalStoragePersister(props)
  }

  public async persistClient(client: TPersistData) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(client))
  }

  public async restoreClient() {
    const data = window.localStorage.getItem(this.storageKey)
    if (!data) return

    return JSON.parse(data) as TPersistData
  }

  public async removeClient() {
    window.localStorage.removeItem(this.storageKey)
  }

  public get storageKey() {
    return this._props.storageKey
  }
}
