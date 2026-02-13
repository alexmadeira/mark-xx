import type { ILoaderRequests } from '@/interfaces/loader/requests'
import type {
  TLoaderLoadedRequests,
  TLoaderLoadingRequests,
  TLoaderRequestErrorProps,
  TLoaderRequestFinishedProps,
  TLoaderRequestListeners,
  TLoaderRequestNotifyListenersProps,
  TLoaderRequestStartedProps,
  TLoaderRequestSubscribeProps,
} from '@/services/builder/loader/requests'

import _ from 'lodash'

export class LoaderRequests implements ILoaderRequests {
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

  public requestStarted(...[path]: TLoaderRequestStartedProps) {
    this.loadingRequests.add(path)

    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Started', path)
  }

  public requestFinished(...[path]: TLoaderRequestFinishedProps) {
    this.loadedRequests.add(path)

    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Finished', path)

    this.checkAllFinished()
  }

  public requestError(...[path]: TLoaderRequestErrorProps) {
    this.loadedRequests.add(path)

    this.notifyListeners('REQUEST:Update')
    this.notifyListeners('REQUEST:Error', path)
    this.notifyListeners('REQUEST:Finished', path)

    this.checkAllFinished()
  }

  private notifyListeners(...[type, payload]: TLoaderRequestNotifyListenersProps) {
    for (const listener of this.listeners[type]) {
      listener(payload)
    }
  }

  private checkAllFinished() {
    if (!this.finished) this.notifyListeners('REQUEST:AllFinished')
  }

  public subscribe(...[type, callback]: TLoaderRequestSubscribeProps) {
    this.listeners[type].add(callback)
    return () => this.listeners[type].delete(callback)
  }

  public get loading() {
    return this.loadingRequests.size
  }

  public get loaded() {
    return this.loadedRequests.size
  }

  public get finished() {
    return this.loaded === this.loading
  }
}
