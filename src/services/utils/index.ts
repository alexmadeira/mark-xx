import { Timer } from './timer'

let utilTimer: Timer

export function timer() {
  if (!utilTimer) utilTimer = new Timer()
  return utilTimer
}
