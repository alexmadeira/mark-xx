import type { TPersistData, TPersisterProps, TPersistEvents } from '@/services/lib/react-query/persister'

import { Persister } from './persister'

export class LocalStoragePersister extends Persister {
  static create(props: TPersisterProps, events: Partial<TPersistEvents> = {}) {
    return new LocalStoragePersister(props, events)
  }

  public async persistClient(client: TPersistData) {
    this.updateClientStatus('persisting')
    window.localStorage.setItem(this.storageKey, JSON.stringify(client))
    this.updateClientStatus('persisted')
  }

  public async restoreClient() {
    this.updateCacheStatus('restoring')
    const data = window.localStorage.getItem(this.storageKey)

    if (data) {
      this.updateCacheStatus('restored')
      return JSON.parse(data) as TPersistData
    }

    this.updateCacheStatus('restored')
  }

  public async removeClient() {
    window.localStorage.removeItem(this.storageKey)
  }
}
