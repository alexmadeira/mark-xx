import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type {
  TLoaderLoadedMedias,
  TLoaderMediaListeners,
  TLoaderMediaLoadedErrorProps,
  TLoaderMediaLoadedProps,
  TLoaderMediaNotifyListenersProps,
  TLoaderMedias,
  TLoaderMediaSubscribeProps,
} from '@/services/builder/loader/medias'

import _ from 'lodash'

export class LoaderMedias implements ILoaderMedias {
  private readonly medias: TLoaderMedias
  private readonly listeners: TLoaderMediaListeners
  private readonly loadedMedias: TLoaderLoadedMedias

  protected constructor() {
    this.medias = new Map()
    this.loadedMedias = new Map()

    this.listeners = {
      'MEDIA:Error': new Set(),
      'MEDIA:Started': new Set(),
      'MEDIA:Finished': new Set(),
      'MEDIA:Update': new Set(),
      'MEDIA:AllFinished': new Set(),
      'MEDIA:CheckDocument': new Set(),
      'MEDIA:VIDEO:Error': new Set(),
      'MEDIA:VIDEO:Started': new Set(),
      'MEDIA:VIDEO:Finished': new Set(),
      'MEDIA:VIDEO:Update': new Set(),
      'MEDIA:VIDEO:AllFinished': new Set(),
      'MEDIA:IMAGE:Error': new Set(),
      'MEDIA:IMAGE:Started': new Set(),
      'MEDIA:IMAGE:Finished': new Set(),
      'MEDIA:IMAGE:Update': new Set(),
      'MEDIA:IMAGE:AllFinished': new Set(),
    }
    this.buildMediaMonitor()
  }

  static create() {
    return new LoaderMedias()
  }

  private buildMediaMonitor() {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target === document.body) return
        switch (mutation.type) {
          case 'childList':
            return this.loadMedias()
        }
      })
    }).observe(document.body, { childList: true, subtree: true })
  }

  private setUnloadedImages() {
    Array.from(document.images).forEach((img) => {
      if (this.loadedMedias.has(img.src)) return
      if (img.complete) return

      this.medias.set(img.src, { el: img, type: 'image' })
    })
  }

  private setUnloadedVideos() {
    Array.from(document.querySelectorAll('video')).forEach((video) => {
      if (!video.src) return
      if (this.loadedMedias.has(video.src)) return
      if (video.readyState === 0) return
      if (video.readyState >= 3) return

      this.medias.set(video.src, { el: video, type: 'video' })
    })
  }

  private imageLoader(img: HTMLImageElement) {
    this.notifyListeners('MEDIA:IMAGE:Started', img.src)
    this.notifyListeners('MEDIA:IMAGE:Update', this.medias.size)

    img.addEventListener('load', () => this.mediaLoaded('image', img.src))
    img.addEventListener('error', () => this.mediaLoadedError('image', img.src))
  }

  private videoLoader(video: HTMLVideoElement) {
    this.notifyListeners('MEDIA:VIDEO:Started', video.src)
    this.notifyListeners('MEDIA:VIDEO:Update', this.medias.size)

    video.addEventListener('canplay', () => this.mediaLoaded('video', video.src), { once: true })
    video.addEventListener('error', () => this.mediaLoaded('video', video.src), { once: true })
  }

  private loadMedias() {
    this.notifyListeners('MEDIA:CheckDocument')

    this.setUnloadedImages()
    this.setUnloadedVideos()

    this.mediaLoader()
  }

  private mediaLoaded(...[type, src]: TLoaderMediaLoadedProps) {
    this.notifyListeners('MEDIA:Finished', src)
    this.notifyListeners('MEDIA:Update', this.medias.size)

    this.loadedMedias.set(src, type)

    switch (type) {
      case 'image':
        this.notifyListeners('MEDIA:IMAGE:Finished', src)
        this.notifyListeners('MEDIA:IMAGE:Update', this.medias.size)
        break
      case 'video':
        this.notifyListeners('MEDIA:VIDEO:Finished', src)
        this.notifyListeners('MEDIA:VIDEO:Update', this.medias.size)
        break
    }

    this.checkAllFinished()
  }

  private mediaLoadedError(...[src, type]: TLoaderMediaLoadedErrorProps) {
    this.notifyListeners('MEDIA:Error', src)

    switch (type) {
      case 'image':
        return this.notifyListeners('MEDIA:IMAGE:Error', src)
      case 'video':
        return this.notifyListeners('MEDIA:VIDEO:Error', src)
    }

    this.mediaLoaded(src, type)
  }

  private mediaLoader() {
    this.medias.forEach((media) => {
      this.notifyListeners('MEDIA:Started', media.el.src)
      this.notifyListeners('MEDIA:Update', this.medias.size)

      switch (media.type) {
        case 'image':
          this.imageLoader(media.el)
          break
        case 'video':
          this.videoLoader(media.el)
          break
      }
    })
  }

  private checkAllFinished() {
    if (this.finished.all) this.notifyListeners('MEDIA:AllFinished')

    if (this.finished.image) this.notifyListeners('MEDIA:IMAGE:AllFinished')
    if (this.finished.video) this.notifyListeners('MEDIA:VIDEO:AllFinished')
  }

  private notifyListeners(...[type, payload]: TLoaderMediaNotifyListenersProps) {
    for (const listener of this.listeners[type]) {
      listener(payload)
    }
  }

  public subscribe(...[type, callback]: TLoaderMediaSubscribeProps) {
    this.listeners[type].add(callback)
    return () => this.listeners[type].delete(callback)
  }

  public get loadinng() {
    return {
      all: this.medias.size,
      image: _.countBy([...this.medias.values()], 'type').image || 0,
      video: _.countBy([...this.medias.values()], 'type').video || 0,
    }
  }

  public get loaded() {
    const loadedMedias = _.countBy([...this.loadedMedias.values()])

    return {
      all: this.loadedMedias.size,
      image: loadedMedias.image || 0,
      video: loadedMedias.video || 0,
    }
  }

  public get finished() {
    return {
      all: this.loaded.all === this.loadinng.all,
      image: this.loaded.image === this.loadinng.image,
      video: this.loaded.video === this.loadinng.video,
    }
  }
}
