import type { ILoaderRequests } from '@/interfaces/loader/requests'
import type {
  TLoaderAddInstanceProps,
  TLoaderLoadedRequests,
  TLoaderLoadingRequests,
  TLoaderRequestErrorProps,
  TLoaderRequestFinishedProps,
  TLoaderRequestInstance,
  TLoaderRequestListeners,
  TLoaderRequestNotifyListenersProps,
  TLoaderRequestStartedProps,
  TLoaderRequestSubscribeProps,
} from '@/services/builder/loader/requests'

import _ from 'lodash'

export class LoaderRequests implements ILoaderRequests<TLoaderRequestInstance> {
  private readonly loadingRequests: TLoaderLoadingRequests
  private readonly loadedRequests: TLoaderLoadedRequests
  private readonly listeners: TLoaderRequestListeners

  protected constructor() {
    this.loadingRequests = new Set()
    this.loadedRequests = new Set()
    this.listeners = {
      'REQUEST:Error': new Set(),
      'REQUEST:Started': new Set(),
      'REQUEST:Finished': new Set(),
      'REQUEST:Update': new Set(),
      'REQUEST:AllFinished': new Set(),
    }
    _.bindAll(this, ['requestStarted', 'requestFinished', 'requestError', 'notifyListeners'])
  }

  static create() {
    return new LoaderRequests()
  }

  private requestStarted(...[config]: TLoaderRequestStartedProps) {
    this.loadingRequests.add(config.url!)
    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Started', config.url)
    return config
  }

  private requestFinished(...[response]: TLoaderRequestFinishedProps) {
    this.loadedRequests.add(response.config.url!)

    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Finished', response.config.url)
    this.checkAllFinished()
    return response
  }

  private requestError(...[error]: TLoaderRequestErrorProps) {
    this.loadedRequests.add(error.config!.url!)

    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Error', error.config!.url)
    this.notifyListeners('REQUEST:Finished', error.config!.url)
    this.checkAllFinished()
    return Promise.reject(error)
  }

  private notifyListeners(...[type, payload]: TLoaderRequestNotifyListenersProps) {
    for (const listener of this.listeners[type]) {
      listener(payload)
    }
  }

  private checkAllFinished() {
    if (!this.finished) this.notifyListeners('REQUEST:AllFinished')
  }

  public addInstance(...[instance]: TLoaderAddInstanceProps) {
    instance.interceptors.request.use(this.requestStarted, this.requestError)
    instance.interceptors.response.use(this.requestFinished, this.requestError)
  }

  public subscribe(...[type, callback]: TLoaderRequestSubscribeProps) {
    this.listeners[type].add(callback)
    return () => this.listeners[type].delete(callback)
  }

  public get loadinng() {
    return this.loadingRequests.size
  }

  public get loaded() {
    return this.loadedRequests.size
  }

  public get finished() {
    return this.loaded === this.loadinng
  }
}
