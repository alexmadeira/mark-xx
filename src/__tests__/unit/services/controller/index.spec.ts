import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const {
  activityConstructor,
  audioConstructor,
  colorCreate,
  easterEggConstructor,
  easterEggsInstance,
  elementCreate,
  heroConstructor,
  instances,
  interfaceEventInstance,
  mouseConstructor,
  overlapConstructor,
  routeConstructor,
  scrollingCreate,
  seoConstructor,
  snakeEventInstance,
  soundManagerInstance,
  soundManagerMock,
  soundMapInstance,
  timerInstance,
  timerMock,
} = vi.hoisted(() => {
  const controllerInstances = {
    activity: { controller: 'activity' },
    audio: { controller: 'audio' },
    colorLogo: { controller: 'color-logo' },
    easterEgg: { controller: 'easter-egg' },
    elementHeader: { controller: 'element-header' },
    hero: { controller: 'hero' },
    mouse: { controller: 'mouse' },
    overlap: { controller: 'overlap' },
    route: { controller: 'route' },
    scrolling: { controller: 'scrolling' },
    seo: { controller: 'seo' },
  }
  const timer = { timer: 'timer' }
  const soundManager = { soundManager: 'sound-manager' }

  return {
    activityConstructor: vi.fn(() => controllerInstances.activity),
    audioConstructor: vi.fn(() => controllerInstances.audio),
    colorCreate: vi.fn(() => controllerInstances.colorLogo),
    easterEggConstructor: vi.fn(() => controllerInstances.easterEgg),
    easterEggsInstance: [{ name: 'snake' }],
    elementCreate: vi.fn(() => controllerInstances.elementHeader),
    heroConstructor: vi.fn(() => controllerInstances.hero),
    instances: controllerInstances,
    interfaceEventInstance: { event: 'interface' },
    mouseConstructor: vi.fn(() => controllerInstances.mouse),
    overlapConstructor: vi.fn(() => controllerInstances.overlap),
    routeConstructor: vi.fn(() => controllerInstances.route),
    scrollingCreate: vi.fn(() => controllerInstances.scrolling),
    seoConstructor: vi.fn(() => controllerInstances.seo),
    snakeEventInstance: { event: 'snake' },
    soundManagerInstance: soundManager,
    soundManagerMock: vi.fn(() => soundManager),
    soundMapInstance: { soundMap: 'sound-map' },
    timerInstance: timer,
    timerMock: vi.fn(() => timer),
  }
})

vi.mock('_CFG/easter-eggs', () => ({ easterEggs: easterEggsInstance }))
vi.mock('_CFG/sounds', () => ({ soundMap: soundMapInstance }))
vi.mock('_SRV/builder/event', () => ({
  interfaceEvent: interfaceEventInstance,
  snakeEvent: snakeEventInstance,
}))
vi.mock('_SRV/builder/sound', () => ({ soundManager: soundManagerMock }))
vi.mock('_SRV/utils', () => ({ timer: timerMock }))
vi.mock('_SRV/controller/_defaults', () => ({
  defaultColorProps: { logo: { default: '#fff' } },
  defaultElementProps: { header: { name: 'header' } },
  defaultRouteProps: { paths: [] },
  defaultSEOProps: { defaultTitle: 'MARK-XX', locale: 'pt_BR', siteName: 'MARK' },
  defaultScrollingProps: { duration: 1.2 },
}))
vi.mock('_SRV/controller/activity-controller', () => ({ ActivityController: activityConstructor }))
vi.mock('_SRV/controller/audio-controller', () => ({ AudioController: audioConstructor }))
vi.mock('_SRV/controller/color-controller', () => ({ ColorController: { create: colorCreate } }))
vi.mock('_SRV/controller/easter-egg-controller', () => ({ EasterEggController: easterEggConstructor }))
vi.mock('_SRV/controller/element-controller', () => ({ ElementController: { create: elementCreate } }))
vi.mock('_SRV/controller/hero-controller', () => ({ HeroController: heroConstructor }))
vi.mock('_SRV/controller/mouse-controller', () => ({ MouseController: mouseConstructor }))
vi.mock('_SRV/controller/overlap-controller', () => ({ OverlapController: overlapConstructor }))
vi.mock('_SRV/controller/route-controller', () => ({ RouteController: routeConstructor }))
vi.mock('_SRV/controller/scrolling-controller', () => ({ ScrollingController: { create: scrollingCreate } }))
vi.mock('_SRV/controller/seo-controller', () => ({ SEOController: seoConstructor }))

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Controller', () => {
    describe('Index', () => {
      it('should create singleton controller instances', async () => {
        const {
          activityController,
          audioController,
          easterEggController,
          heroController,
          mouseController,
          overlapController,
          routeController,
          scrollingController,
          seoController,
        } = await import('_SRV/controller')

        expect(seoController()).toBe(instances.seo)
        expect(seoController()).toBe(instances.seo)
        expect(audioController()).toBe(instances.audio)
        expect(activityController()).toBe(instances.activity)
        expect(heroController()).toBe(instances.hero)
        expect(routeController()).toBe(instances.route)
        expect(mouseController()).toBe(instances.mouse)
        expect(overlapController()).toBe(instances.overlap)
        expect(scrollingController()).toBe(instances.scrolling)
        expect(easterEggController()).toBe(instances.easterEgg)

        expect(seoConstructor).toHaveBeenCalledOnce()
        expect(audioConstructor).toHaveBeenCalledOnce()
        expect(activityConstructor).toHaveBeenCalledOnce()
        expect(heroConstructor).toHaveBeenCalledOnce()
        expect(routeConstructor).toHaveBeenCalledOnce()
        expect(mouseConstructor).toHaveBeenCalledOnce()
        expect(overlapConstructor).toHaveBeenCalledOnce()
        expect(scrollingCreate).toHaveBeenCalledOnce()
        expect(easterEggConstructor).toHaveBeenCalledOnce()
      })

      it('should wire controller dependencies from builders and defaults', async () => {
        const { activityController, audioController, heroController } = await import('_SRV/controller')

        audioController()
        activityController()
        heroController()

        expect(soundManagerMock).toHaveBeenCalledWith(soundMapInstance)
        expect(audioConstructor).toHaveBeenCalledWith(soundManagerInstance, snakeEventInstance, interfaceEventInstance)
        expect(timerMock).toHaveBeenCalledTimes(2)
        expect(activityConstructor).toHaveBeenCalledWith(timerInstance)
        expect(heroConstructor).toHaveBeenCalledWith(timerInstance)
      })

      it('should cache color and element controllers by key', async () => {
        const { colorController, elementController } = await import('_SRV/controller')

        expect(colorController('logo')).toBe(instances.colorLogo)
        expect(colorController('logo')).toBe(instances.colorLogo)
        expect(elementController('header')).toBe(instances.elementHeader)
        expect(elementController('header')).toBe(instances.elementHeader)

        expect(colorCreate).toHaveBeenCalledOnce()
        expect(colorCreate).toHaveBeenCalledWith({ default: '#fff' })
        expect(elementCreate).toHaveBeenCalledOnce()
        expect(elementCreate).toHaveBeenCalledWith({ name: 'header' })
      })
    })
  })
})
