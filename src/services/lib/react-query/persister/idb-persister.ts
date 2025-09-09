import type { TPersistData, TPersisterProps, TPersistEvents } from '@/services/lib/react-query/persister'

import { del, get, set } from 'idb-keyval'

import { Persister } from './persister'

export class IDBPersister extends Persister {
  static create(props: TPersisterProps, events: Partial<TPersistEvents> = {}) {
    return new IDBPersister(props, events)
  }

  private async getStorageVersion() {
    return await get<string>(`${this.storageKey}::version`)
  }

  private async getStorageData() {
    await this.checkVersion()
    return await get<TPersistData>(this.storageKey)
  }

  private async checkVersion() {
    const version = await this.getStorageVersion()
    if (version === this.version) return true

    await this.removeClient()
    await set(`${this.storageKey}::version`, this.version)
  }

  public async persistClient(data: TPersistData) {
    try {
      this.updateClientStatus('persisting')
      await set(this.storageKey, data)

      this.updateClientStatus('persisted')
    } catch (_err) {
      this.updateClientStatus('error')
    }
  }

  public async restoreClient() {
    try {
      this.updateCacheStatus('restoring')
      const result = await this.getStorageData()

      this.updateCacheStatus('restored')
      return result
    } catch (_err) {
      this.updateCacheStatus('error')
    }
  }

  public async removeClient() {
    await del(this.storageKey)
  }
}
