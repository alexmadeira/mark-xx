export interface ILoaderProgress {
  set: (size: number) => void
  done: () => void
  start: () => void
}
