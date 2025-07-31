import type { IPersister, TPersistData, TPersisterProps } from '@/services/lib/react-query/persister'

import { del, get, set } from 'idb-keyval'

export class IDBPersister implements IPersister {
  protected constructor(private readonly _props: TPersisterProps) {}

  static create(props: TPersisterProps) {
    return new IDBPersister(props)
  }

  public async persistClient(data: TPersistData) {
    await set(this.storageKey, data)
  }

  public async restoreClient() {
    return await get<TPersistData>(this.storageKey)
  }

  public async removeClient() {
    await del(this.storageKey)
  }

  public get storageKey() {
    return this._props.storageKey
  }
}
