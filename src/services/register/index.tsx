import { eggEvents } from '_CFG/easter-eggs/egg-events'

import { EggListenersRegister } from './egg-listeners-register'

let eggListenersRegister: EggListenersRegister

export function registerEggListeners() {
  if (!eggListenersRegister) eggListenersRegister = new EggListenersRegister(eggEvents)
  return eggListenersRegister
}
