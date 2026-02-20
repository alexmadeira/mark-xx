import type { TELoaderStatus } from '@/enums/loader'
import type { ILoader } from '@/interfaces/loader'
import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type { ILoaderRequests } from '@/interfaces/loader/requests'
import type {
  TLoaderEventListeners,
  TLoaderEventNotifyListenersProps,
  TLoaderEventSubscribeProps,
  TLoaderProps,
} from '@/services/builder/loader'
import type { ITimer } from '@/services/utils/timer'

import _ from 'lodash'

import { useLoader } from '_STR/useLoader'

export class LoaderBuilder implements ILoader {
  private readonly loaderActions = useLoader.getState().actions
  private readonly listeners: TLoaderEventListeners

  constructor(
    private readonly mediasLoader: ILoaderMedias,
    private readonly requestsLoader: ILoaderRequests,
    private readonly timer: ITimer,
    private readonly props: TLoaderProps,
  ) {
    this.listeners = {
      'Loader:Finished': new Set(),
    }

    _.bindAll(this, ['startLoading', 'checkAutoLoad', 'updateLoading', 'finishCheck', 'finish'])

    this.timer.delay(this.checkAutoLoad, 1000)
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
    if (useLoader.getState().data.status === 'loading') return

    this.updateLoaderStatus()
  }

  private checkAutoLoad() {
    const hasNothingToLoad = this.requestsLoader.loading === 0 && this.mediasLoader.loading.all === 0

    if (hasNothingToLoad) this.autoLoaded()
  }

  private updateLoaderStatus(status?: TELoaderStatus) {
    this.loaderActions.setStatus(status || this.currentStatus)
  }

  private updateLoading() {
    const loadingProgress = this.totalLoaded / this.totalLoading

    if (!useLoader.getState().data.once) {
      this.loaderActions.setLoaded(loadingProgress)
    }

    this.updateLoaderStatus()

    this.finishCheck()
    this.checkAutoLoad()
  }

  private finishCheck() {
    if (this.currentStatus === 'loading') return

    this.finish()
  }

  private finish() {
    this.updateLoaderStatus('finished')

    if (this.once) this.loaderActions.onceFinished()

    this.notifyListeners('Loader:Finished')
  }

  private get once() {
    return this.props.once
  }

  private autoLoaded() {
    this.finish()
  }

  private notifyListeners(...[type, payload]: TLoaderEventNotifyListenersProps) {
    for (const listener of this.listeners[type]) {
      listener(payload)
    }
  }

  private get totalLoading() {
    return this.requestsLoader.loading + this.mediasLoader.loading.all
  }

  private get totalLoaded() {
    return this.requestsLoader.loaded + this.mediasLoader.loaded.all
  }

  private get currentStatus() {
    if (this.totalLoading - this.totalLoaded > 0) return 'loading'
    if (this.totalLoading - this.totalLoaded === 0) return 'loaded'
  }

  public on(...[type, callback]: TLoaderEventSubscribeProps) {
    this.listeners[type].add(callback)
    return () => this.listeners[type].delete(callback)
  }

  public requestError(requestKey: string) {
    this.requestsLoader.requestError(requestKey)
  }

  public requestStarted(requestKey: string) {
    this.requestsLoader.requestStarted(requestKey)
  }

  public requestFinished(requestKey: string) {
    this.requestsLoader.requestFinished(requestKey)
  }
}
