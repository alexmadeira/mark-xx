import type {
  TSoundSystemPauseProps,
  TSoundSystemPlayProps,
  TSoundSystemSoundKey,
  TSoundSystemSoundMap,
  TSoundSystemStopProps,
} from '@/services/builder/sound'

import { Howl } from 'howler'

export class SoundManager<TSounds extends TSoundSystemSoundMap = TSoundSystemSoundMap> {
  private sounds = new Map<TSoundSystemSoundKey, Howl>()

  constructor(private readonly soundMap: TSoundSystemSoundMap) {
    this.preload()
  }

  private preload() {
    for (const key in this.soundMap) {
      const config = this.soundMap[key]

      const sound = new Howl({
        src: [config.src],
        volume: config.volume ?? 1,
        loop: config?.loop ?? false,
        preload: true,
      })

      this.sounds.set(key, sound)
    }
  }

  public play(...[id, options]: TSoundSystemPlayProps<TSounds>) {
    const sound = this.sounds.get(id)
    if (!sound) return

    if (options?.loop !== undefined) sound.loop(options.loop)
    if (options?.volume !== undefined) sound.volume(options.volume)

    sound.play()
  }

  public playOnce(...[id, options]: TSoundSystemPlayProps<TSounds>) {
    const sound = this.sounds.get(id)

    if (!sound) return
    if (sound.playing()) return

    this.play(id, options)
  }

  public stop(...[id]: TSoundSystemStopProps<TSounds>) {
    const sound = this.sounds.get(id)
    sound?.stop()
  }

  public pause(...[id]: TSoundSystemPauseProps<TSounds>) {
    const sound = this.sounds.get(id)
    sound?.pause()
  }

  public stopAll() {
    this.sounds.forEach((sound) => sound.stop())
  }
}
