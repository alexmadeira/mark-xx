import type { ILoader } from '@/interfaces/loader'
import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type { ILoaderProgress } from '@/interfaces/loader/progress'
import type { ILoaderRequests } from '@/interfaces/loader/requests'

import _ from 'lodash'

export class LoaderBuilder<TRequestInstance = unknown> implements ILoader<TRequestInstance> {
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
    this.requestsLoader.subscribe('REQUEST:Started', this.progressLoader.start.bind(this))
    this.requestsLoader.subscribe('REQUEST:Finished', this.calculateLoadingSize.bind(this))
    this.requestsLoader.subscribe('REQUEST:AllFinished', this.finish.bind(this))
    this.requestsLoader.subscribe('REQUEST:UpdateSize', this.calculateLoadingSize.bind(this))

    this.mediasLoader.subscribe('MEDIA:Started', this.progressLoader.start.bind(this))
    this.mediasLoader.subscribe('MEDIA:Finished', this.calculateLoadingSize.bind(this))
    this.mediasLoader.subscribe('MEDIA:AllFinished', this.finish.bind(this))
    this.mediasLoader.subscribe('MEDIA:UpdateSize', this.calculateLoadingSize.bind(this))
  }

  private calculateLoadingSize() {
    const total = this.requestsLoader.total + this.mediasLoader.total.all
    if (!total) return
    const requestsPercent = this.requestsLoader.size / total
    const mediasPercent = this.mediasLoader.size.all / total
    const loadingSize = 1 - (requestsPercent + mediasPercent)

    this.progressLoader.set(loadingSize)
  }

  private finish() {
    // if (this.requestsLoader.size || this.mediasLoader.size.all) return
    // this.progressLoader.done()
  }

  public addInstance(instance: TRequestInstance) {
    this.requestsLoader.addInstance(instance)
  }
}
