import type { TEPersistCacheStatus, TEPersistClientStatus } from '@/enums/persist'
import type { IPersister, TPersistData, TPersisterProps, TPersistEvents } from '@/services/lib/react-query/persister'

export abstract class Persister implements IPersister {
  protected constructor(
    private readonly _props: TPersisterProps,
    private readonly _event: Partial<TPersistEvents>,
  ) {
    this.updateCacheStatus('idle')
  }

  protected updateCacheStatus(status: TEPersistCacheStatus) {
    if (this._event.setCacheStatus) {
      this._event.setCacheStatus(status)
    }
  }

  protected updateClientStatus(status: TEPersistClientStatus) {
    if (this._event.setPersistClientStatus) {
      this._event.setPersistClientStatus(status)
    }
  }

  abstract restoreClient(): Promise<TPersistData | undefined>
  abstract persistClient(data: TPersistData): Promise<void>
  abstract removeClient(): Promise<void>

  public get storageKey() {
    return this._props.storageKey
  }

  public get version() {
    return this._props.version
  }
}
