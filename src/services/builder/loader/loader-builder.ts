import type { TELoaderStatus } from '@/enums/loader'
import type { ILoader } from '@/interfaces/loader'
import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type { ILoaderProgress } from '@/interfaces/loader/progress'
import type { ILoaderRequests } from '@/interfaces/loader/requests'

import { useLoader } from '_STR/useLoader'

export class LoaderBuilder<TRequestInstance = unknown> implements ILoader<TRequestInstance> {
  private readonly loaderActions = useLoader.getState().actions

  constructor(
    private readonly requestsLoader: ILoaderRequests<TRequestInstance>,
    private readonly mediasLoader: ILoaderMedias,
    private readonly progressLoader: ILoaderProgress,
  ) {
    this.build()
  }

  private build() {
    this.registerListeners()
  }

  private registerListeners() {
    this.requestsLoader.subscribe('REQUEST:Started', this.startLoading.bind(this))
    this.requestsLoader.subscribe('REQUEST:Update', this.calculateLoadingSize.bind(this))
    this.requestsLoader.subscribe('REQUEST:Finished', this.calculateLoadingSize.bind(this))
    this.requestsLoader.subscribe('REQUEST:AllFinished', this.finishCheck.bind(this))

    this.mediasLoader.subscribe('MEDIA:Started', this.startLoading.bind(this))
    this.mediasLoader.subscribe('MEDIA:Update', this.calculateLoadingSize.bind(this))
    this.mediasLoader.subscribe('MEDIA:Finished', this.calculateLoadingSize.bind(this))
    this.mediasLoader.subscribe('MEDIA:AllFinished', this.finishCheck.bind(this))
  }

  private startLoading() {
    if (useLoader.getState().data.status === 'loading') return

    this.updateLoaderStatus()
    this.progressLoader.start()
  }

  private updateLoaderStatus(status?: TELoaderStatus) {
    this.loaderActions.setStatus(status || this.currentStatus)
  }

  private calculateLoadingSize() {
    const loadingProgress = 1 - this.totalLoaded / this.totalLoading

    this.loaderActions.setLoaded(loadingProgress)
    this.progressLoader.set(loadingProgress)

    this.updateLoaderStatus()

    this.finishCheck()
  }

  private finishCheck() {
    if (this.currentStatus === 'idle') return
    if (this.currentStatus === 'loading') return

    this.updateLoaderStatus()
    this.progressLoader.done()
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

  public addInstance(instance: TRequestInstance) {
    this.requestsLoader.addInstance(instance)
  }
}
