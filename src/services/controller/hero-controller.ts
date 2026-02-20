import type { THeroControll, THeroSettings, THeroTimeout } from '@/services/controller/hero-controller'
import type { ITimer } from '@/services/utils/timer'

import _ from 'lodash'
import { animate, MotionValue, motionValue } from 'motion'

import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'
import { useHero } from '_STR/useHero'

import { env } from '~/env'

export class HeroController {
  private isRunning = false
  private readonly controll: THeroControll
  private readonly settings: THeroSettings
  private readonly motionColor: MotionValue<string>
  private readonly heroActions = useHero.getState().actions

  private typingInterval: THeroTimeout
  private typingWaitTimeout: THeroTimeout

  constructor(private readonly timer: ITimer) {
    _.bindAll(this, ['write', 'erase', 'start', 'stop'])

    this.settings = {
      wait: env.VITE_HERO_WAIT,
      typingSpeed: env.VITE_HERO_TYPING_SPEED,
      deletionSpeed: env.VITE_HERO_DELETION_SPEED,
    }
    this.controll = { hero: 0, letter: 0 }
    this.motionColor = motionValue('#00000000')
  }

  private next() {
    const heroContent = useFetcherTechnologies.getState().data.list

    this.controll.hero = (this.controll.hero + 1) % heroContent.length
    this.heroActions.setCurrent(this.currentHero)
    this.updateColor(this.currentHero.color)
    this.write()
  }

  private write() {
    this.clearTimer()

    this.typingInterval = this.timer.interval(() => {
      this.controll.letter++
      this.heroActions.setTyping(this.currentHero.type.slice(0, this.controll.letter))
      if (this.controll.letter >= this.currentHero.type.length) {
        this.clearTimer()
        this.typingWaitTimeout = this.timer.delay(this.erase, this.settings.wait)
      }
    }, this.settings.typingSpeed)
  }

  private erase() {
    this.clearTimer()

    this.typingInterval = this.timer.interval(() => {
      this.controll.letter--
      this.heroActions.setTyping(this.currentHero.type.slice(0, this.controll.letter))
      if (this.controll.letter <= 0) {
        this.clearTimer()
        this.next()
      }
    }, this.settings.deletionSpeed)
  }

  private updateColor(newColor: string) {
    const theme = document.querySelector('meta[name="theme-color"]')
    const msTile = document.querySelector('meta[name="msapplication-TileColor"]')
    const msNavbutton = document.querySelector('meta[name="msapplication-navbutton-color"]')
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')

    animate(this.motionColor, newColor, {
      duration: 4,
      onUpdate: (value) => {
        this.heroActions.setColor(value)
        if (theme) theme.setAttribute('content', value)
        if (msTile) msTile.setAttribute('content', value)
        if (msNavbutton) msNavbutton.setAttribute('content', value)
        if (appleStatusBar) appleStatusBar.setAttribute('content', value)
      },
    })
  }

  private clearTimer() {
    if (this.typingWaitTimeout) this.typingWaitTimeout()
    if (this.typingInterval) this.typingInterval()
  }

  private get currentHero() {
    return useFetcherTechnologies.getState().data.list[this.controll.hero]
  }

  public start() {
    if (this.isRunning) return
    this.isRunning = true
    this.heroActions.setCurrent(this.currentHero)
    this.updateColor(this.currentHero.color)
    this.write()
  }

  public stop() {
    this.clearTimer()
    this.isRunning = false
  }
}
