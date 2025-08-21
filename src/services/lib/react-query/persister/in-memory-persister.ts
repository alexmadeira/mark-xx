import type { TPersistData, TPersisterProps, TPersistEvents } from '@/services/lib/react-query/persister'

import { Persister } from './persister'

export class InMemoryPersister extends Persister {
  private readonly storage = new Map<string, TPersistData>()

  static create(props: TPersisterProps, events: Partial<TPersistEvents> = {}) {
    return new InMemoryPersister(props, events)
  }

  public async persistClient(client: TPersistData) {
    this.updateClientStatus('persisting')
    this.storage.set(this.storageKey, client)
    this.updateClientStatus('persisted')
  }

  public async restoreClient() {
    this.updateCacheStatus('restoring')
    const result = this.storage.get(this.storageKey)

    this.updateCacheStatus('restored')
    return result
  }

  public async removeClient() {
    this.storage.delete(this.storageKey)
  }
}
