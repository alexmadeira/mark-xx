import type { ILoaderMedias } from '@/interfaces/loader/medias'
import type {
  TLoaderFetchMediaProps,
  TLoaderGetCachedMediaProps,
  TLoaderGetMediaOriginalSrcProps,
  TLoaderLoadedMedias,
  TLoaderMediaListeners,
  TLoaderMediaLoadedProps,
  TLoaderMediaNotifyListenersProps,
  TLoaderMedias,
  TLoaderMediaSubscribeProps,
  TLoaderSaveMediaToCacheProps,
} from '@/services/builder/loader/medias'

import { get, set } from 'idb-keyval'
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

  private fetchMedia = _.memoize(async (...[src]: TLoaderFetchMediaProps) => {
    const cachedUrl = await this.getCachedMedia(src)
    if (cachedUrl) return cachedUrl

    const response = await fetch(src)
    const blob = await response.blob()
    await set(src, blob)

    return URL.createObjectURL(blob)
  })

  private buildMediaMonitor() {
    new MutationObserver(async (mutations) => {
      for (const mutation of mutations) {
        if (mutation.target === document.body) continue
        if (mutation.type === 'childList') {
          this.loadMedias()
        }
      }
    }).observe(document.body, { childList: true, subtree: true })
  }

  private async getCachedMedia(...[src]: TLoaderGetCachedMediaProps) {
    const loaded = this.loadedMedias.get(src)
    if (loaded) return loaded.cacheUrl

    const cachedBlob = await get(src)
    if (cachedBlob) return URL.createObjectURL(cachedBlob)
  }

  private async saveMediaToCache(...[src]: TLoaderSaveMediaToCacheProps) {
    if (_.startsWith(src, 'blob:')) return src

    const loaded = this.loadedMedias.get(src)
    if (loaded) return loaded.cacheUrl

    return await this.fetchMedia(src)
  }

  private getMediaOriginalSrc(...[media]: TLoaderGetMediaOriginalSrcProps) {
    return media.dataset.src ?? media.src
  }

  private setUnloadedImages() {
    for (const img of Array.from(document.images)) {
      this.medias.set(this.getMediaOriginalSrc(img), { el: img, type: 'image' })
    }
  }

  private setUnloadedVideos() {
    for (const video of Array.from(document.querySelectorAll('video'))) {
      this.medias.set(this.getMediaOriginalSrc(video), { el: video, type: 'video' })
    }
  }

  private updateImagesSrc() {
    for (const img of Array.from(document.images)) {
      const loaded = this.loadedMedias.get(this.getMediaOriginalSrc(img))
      if (!loaded) continue
      if (_.startsWith(img.src, 'blob:')) continue

      if (img.src !== loaded.cacheUrl) img.src = loaded.cacheUrl

      this.loadedMedias.set(this.getMediaOriginalSrc(img), { el: img, type: 'image', cacheUrl: loaded.cacheUrl })
    }
  }

  private updateVideoSrc() {
    for (const video of Array.from(document.querySelectorAll('video'))) {
      if (!video.dataset.src) video.dataset.src = this.getMediaOriginalSrc(video)
      const loaded = this.loadedMedias.get(this.getMediaOriginalSrc(video))

      if (!loaded) continue
      if (_.startsWith(video.src, 'blob:')) continue
      if (video.src !== loaded.cacheUrl) video.src = loaded.cacheUrl
      video.load()

      this.loadedMedias.set(this.getMediaOriginalSrc(video), { el: video, type: 'video', cacheUrl: loaded.cacheUrl })
    }
  }

  private async imageLoader(img: HTMLImageElement) {
    this.notifyListeners('MEDIA:IMAGE:Started', img.dataset.src)
    this.notifyListeners('MEDIA:IMAGE:Update', this.medias.size)

    const cacheUrl =
      (await this.getCachedMedia(this.getMediaOriginalSrc(img))) ||
      (await this.saveMediaToCache(this.getMediaOriginalSrc(img)))

    this.loadedMedias.set(this.getMediaOriginalSrc(img), { el: img, type: 'image', cacheUrl })

    this.updateImagesSrc()
    this.mediaLoaded(this.getMediaOriginalSrc(img))
  }

  private async videoLoader(video: HTMLVideoElement) {
    this.notifyListeners('MEDIA:VIDEO:Started', video.src)
    this.notifyListeners('MEDIA:VIDEO:Update', this.medias.size)

    const cacheUrl = await this.saveMediaToCache(this.getMediaOriginalSrc(video))
    this.loadedMedias.set(this.getMediaOriginalSrc(video), { el: video, type: 'video', cacheUrl })

    video.load()

    this.updateVideoSrc()
    this.mediaLoaded(this.getMediaOriginalSrc(video))
  }

  private loadMedias() {
    this.notifyListeners('MEDIA:CheckDocument')

    this.setUnloadedImages()
    this.setUnloadedVideos()

    this.mediaLoader()
  }

  private mediaLoaded(...[src]: TLoaderMediaLoadedProps) {
    this.notifyListeners('MEDIA:Finished', src)
    this.notifyListeners('MEDIA:Update', this.medias.size)

    const loadedMedia = this.loadedMedias.get(src)
    if (!loadedMedia) return

    switch (loadedMedia.type) {
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

  private mediaLoader() {
    this.medias.forEach(async (media) => {
      this.notifyListeners('MEDIA:Started', media.el.src)
      this.notifyListeners('MEDIA:Update', this.medias.size)

      switch (media.type) {
        case 'image':
          await this.imageLoader(media.el)
          break
        case 'video':
          await this.videoLoader(media.el)
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

  public get loading() {
    return {
      all: this.medias.size,
      image: _.countBy([...this.medias.values()], 'type').image || 0,
      video: _.countBy([...this.medias.values()], 'type').video || 0,
    }
  }

  public get loaded() {
    const loadedMedias = _.countBy([...this.loadedMedias.values()], 'type')
    return {
      all: this.loadedMedias.size,
      image: loadedMedias.image || 0,
      video: loadedMedias.video || 0,
    }
  }

  public get finished() {
    return {
      all: this.loaded.all === this.loading.all,
      image: this.loaded.image === this.loading.image,
      video: this.loaded.video === this.loading.video,
    }
  }
}
