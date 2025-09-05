export const LOADER_STATUS = ['idle', 'loading', 'loaded', 'finished', 'error'] as const

export const LOADER_EVENTS = ['Loader:Finished'] as const

export const LOADER_MEDIA_TYPES = ['video', 'image'] as const

export const LOADER_REQUEST_LISTENER_TYPES = [
  'REQUEST:Error',
  'REQUEST:Started',
  'REQUEST:Finished',
  'REQUEST:Update',
  'REQUEST:AllFinished',
] as const
export const LOADER_MEDIA_LISTENER_TYPES = [
  'MEDIA:Error',
  'MEDIA:Started',
  'MEDIA:Finished',
  'MEDIA:AllFinished',
  'MEDIA:Update',
  'MEDIA:CheckDocument',
  'MEDIA:VIDEO:Error',
  'MEDIA:VIDEO:Started',
  'MEDIA:VIDEO:Finished',
  'MEDIA:VIDEO:Update',
  'MEDIA:VIDEO:AllFinished',
  'MEDIA:IMAGE:Error',
  'MEDIA:IMAGE:Started',
  'MEDIA:IMAGE:Finished',
  'MEDIA:IMAGE:Update',
  'MEDIA:IMAGE:AllFinished',
] as const
export const LOADER_LISTENER_TYPES = [...LOADER_REQUEST_LISTENER_TYPES, ...LOADER_MEDIA_LISTENER_TYPES] as const
