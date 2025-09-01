export const LOADER_MEDIA_TYPES = ['video', 'image'] as const
export const LOADER_REQUEST_LISTENER_TYPES = [
  'REQUEST:Error',
  'REQUEST:Started',
  'REQUEST:Finished',
  'REQUEST:UpdateSize',
  'REQUEST:AllFinished',
] as const
export const LOADER_MEDIA_LISTENER_TYPES = [
  'MEDIA:Error',
  'MEDIA:Started',
  'MEDIA:Finished',
  'MEDIA:AllFinished',
  'MEDIA:UpdateSize',
  'MEDIA:CheckDocument',
  'MEDIA:VIDEO:Error',
  'MEDIA:VIDEO:Started',
  'MEDIA:VIDEO:Finished',
  'MEDIA:VIDEO:UpdateSize',
  'MEDIA:VIDEO:AllFinished',
  'MEDIA:IMAGE:Error',
  'MEDIA:IMAGE:Started',
  'MEDIA:IMAGE:Finished',
  'MEDIA:IMAGE:UpdateSize',
  'MEDIA:IMAGE:AllFinished',
] as const
export const LOADER_LISTENER_TYPES = [...LOADER_REQUEST_LISTENER_TYPES, ...LOADER_MEDIA_LISTENER_TYPES] as const
