import type { IPersister, TPersistData, TPersisterProps } from '@/services/lib/react-query/persister'

export class InMemoryPersister implements IPersister {
  private readonly storage = new Map<string, TPersistData>()

  protected constructor(private readonly _props: TPersisterProps) {}

  static create(props: TPersisterProps) {
    return new InMemoryPersister(props)
  }

  public async persistClient(client: TPersistData) {
    console.debug('Persisted client:', this.storageKey, client)
    this.storage.set(this.storageKey, client)
  }

  public async restoreClient() {
    console.debug('Restoring client:', this.storageKey)
    return this.storage.get(this.storageKey)
  }

  public async removeClient() {
    console.debug('Removed client:', this.storageKey)
    this.storage.delete(this.storageKey)
  }

  public get storageKey() {
    return this._props.storageKey
  }
}
