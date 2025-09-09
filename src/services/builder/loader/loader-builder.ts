import type { TELoaderStatus } from '@/enums/loader'
import type { ILoader } from '@/interfaces/loader'
import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type { ILoaderProgress } from '@/interfaces/loader/progress'
import type { ILoaderRequests } from '@/interfaces/loader/requests'
import type {
  TLoaderEventListeners,
  TLoaderEventNotifyListenersProps,
  TLoaderEventSubscribeProps,
  TLoaderProps,
} from '@/services/builder/loader'

import _ from 'lodash'

import { useLoader } from '_STR/useLoader'

export class LoaderBuilder<TRequestInstance = unknown> implements ILoader<TRequestInstance> {
  private readonly loaderActions = useLoader.getState().actions
  private readonly listeners: TLoaderEventListeners

  private permanentlyFinished = false

  constructor(
    private readonly requestsLoader: ILoaderRequests<TRequestInstance>,
    private readonly mediasLoader: ILoaderMedias,
    private readonly progressLoader: ILoaderProgress,
    private readonly _props: TLoaderProps,
  ) {
    this.listeners = {
      'Loader:Finished': new Set(),
    }

    _.bindAll(this, ['startLoading', 'checkAutoLoad', 'updateLoading', 'finishCheck', 'finish'])
    _.delay(this.checkAutoLoad, 1000)

    this.build()
  }

  private build() {
    this.registerListeners()
  }

  private registerListeners() {
    this.requestsLoader.subscribe('REQUEST:Started', this.startLoading.bind(this))
    this.requestsLoader.subscribe('REQUEST:Update', this.updateLoading.bind(this))
    this.requestsLoader.subscribe('REQUEST:Finished', this.updateLoading.bind(this))
    this.requestsLoader.subscribe('REQUEST:AllFinished', this.finishCheck.bind(this))

    this.mediasLoader.subscribe('MEDIA:Started', this.startLoading.bind(this))
    this.mediasLoader.subscribe('MEDIA:Update', this.updateLoading.bind(this))
    this.mediasLoader.subscribe('MEDIA:Finished', this.updateLoading.bind(this))
    this.mediasLoader.subscribe('MEDIA:AllFinished', this.finishCheck.bind(this))
  }

  private startLoading() {
    if (this.permanentlyFinished) return
    if (useLoader.getState().data.status === 'loading') return

    this.updateLoaderStatus()
    this.progressLoader.start()
  }

  private checkAutoLoad() {
    const hasNothingToLoad = this.requestsLoader.loadinng === 0 && this.mediasLoader.loadinng.all === 0
    const hasNothingLoaded = this.requestsLoader.loaded === 0 && this.mediasLoader.loaded.all === 0

    if (hasNothingToLoad && hasNothingLoaded) this.autoLoaded()
  }

  private updateLoaderStatus(status?: TELoaderStatus) {
    this.loaderActions.setStatus(status || this.currentStatus)
  }

  private updateLoading() {
    if (this.permanentlyFinished) return

    const loadingProgress = 1 - this.totalLoaded / this.totalLoading

    this.loaderActions.setLoaded(loadingProgress)
    this.progressLoader.set(loadingProgress)

    this.updateLoaderStatus()

    this.finishCheck()
    this.checkAutoLoad()
  }

  private finishCheck() {
    if (this.currentStatus === 'idle') return
    if (this.currentStatus === 'loading') return

    this.progressLoader.done()
    this.finish()
  }

  private finish() {
    this.updateLoaderStatus('finished')
    this.progressLoader.done()

    if (this.once) this.permanentlyFinished = true

    this.notifyListeners('Loader:Finished')
  }

  private autoLoaded() {
    this.finish()
  }

  private notifyListeners(...[type, payload]: TLoaderEventNotifyListenersProps) {
    for (const listener of this.listeners[type]) {
      listener(payload)
    }
  }

  private get once() {
    return this._props.once
  }

  private get totalLoading() {
    return this.requestsLoader.loadinng + this.mediasLoader.loadinng.all
  }

  private get totalLoaded() {
    return this.requestsLoader.loaded + this.mediasLoader.loaded.all
  }

  private get currentStatus() {
    if (this.totalLoading - this.totalLoaded > 0) return 'loading'
    if (this.totalLoading - this.totalLoaded === 0) return 'loaded'

    return 'idle'
  }

  public on(...[type, callback]: TLoaderEventSubscribeProps) {
    this.listeners[type].add(callback)
    return () => this.listeners[type].delete(callback)
  }

  public addInstance(instance: TRequestInstance) {
    this.requestsLoader.addInstance(instance)
  }
}
