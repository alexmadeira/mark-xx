import type {
  TParticleAutoPush,
  TParticleAutoPushMode,
  TParticleCanvasProps,
  TParticleProps,
} from '@/services/builder/particle'
import type { Container, ISourceOptions, RecursivePartial } from '@tsparticles/engine'

import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import _ from 'lodash'

export class ParticlesBuilder {
  private _container: Container | undefined

  protected constructor(
    private readonly _props: ISourceOptions,
    private readonly _id: string,
    private readonly _autoPush?: TParticleAutoPush,
  ) {
    this.init()
  }

  static create(options: TParticleProps) {
    const particlesProps = options.particles

    const particlesCollisionsProps = particlesProps.collisions
    const particlesCollisionsDefault = 'bounce'

    const particlesGravityProps = particlesProps.gravity
    const particlesGravityDefault = _.toNumber(particlesGravityProps ?? 0)

    const particlesMoveProps = particlesProps.move
    const particlesOutModesProps = _.get(particlesMoveProps, 'outModes', 'none')
    const particlesOutModesDefault = 'none'

    const particlesNumberProps = particlesProps.number
    const particlesNumberDefault = _.toNumber(particlesNumberProps ?? 1)

    const particlesNumberLimitProps = _.get(particlesNumberProps, 'limit', false)
    const particlesNumberLimitDefault = _.toNumber(particlesNumberLimitProps ?? 0)

    const particlesOpacityProps = particlesProps.opacity
    const particlesOpacityDefault = _.toNumber(particlesOpacityProps ?? 1)

    const particlesColors = particlesProps.colors ?? ['transparent']

    const particlesSizeProps = particlesProps.size
    const particlesSizeDefault = _.toNumber(particlesSizeProps ?? 100)

    const props: ISourceOptions = {
      clear: true,
      smooth: true,
      fpsLimit: 60,
      pauseOnBlur: true,
      detectRetina: true,
      pauseOnOutsideViewport: true,
      name: options.id ?? 'particle',
      delay: options.delay ?? 0,
      autoPlay: !!options.autoPlay,
      fullScreen: {
        enable: options.fullScreen ?? false,
        zIndex: 0,
      },
      particles: {
        color: {
          value: particlesColors,
        },
        shape: {
          type: particlesProps.shape?.type,
          options: particlesProps.shape as RecursivePartial<unknown>,
        },
        collisions: {
          enable: !!particlesCollisionsProps,
          mode: _.get(particlesCollisionsProps, 'mode', particlesCollisionsDefault),
          maxSpeed: _.get(particlesCollisionsProps, 'maxSpeed', 4),
          absorb: {
            speed: _.get(particlesCollisionsProps, 'absorb', 0),
          },
        },
        move: {
          enable: !!particlesMoveProps,
          direction: _.get(particlesMoveProps, 'direction', 'none'),
          random: _.get(particlesMoveProps, 'random', true),
          size: _.get(particlesMoveProps, 'size', true),
          speed: _.get(particlesMoveProps, 'speed', 4),
          gravity: {
            enable: !!particlesGravityProps,
            acceleration: _.get(particlesGravityProps, 'value', particlesGravityDefault),
            inverse: _.get(particlesGravityProps, 'inverse', false),
          },
          outModes: {
            default: _.get(particlesOutModesProps, 'default', particlesOutModesDefault),
            bottom: _.get(particlesOutModesProps, 'bottom', undefined),
            left: _.get(particlesOutModesProps, 'bottom', undefined),
            right: _.get(particlesOutModesProps, 'bottom', undefined),
            top: _.get(particlesOutModesProps, 'bottom', undefined),
          },
        },
        number: {
          value: _.get(particlesNumberProps, 'value', particlesNumberDefault),
          density: {
            enable: !!_.get(particlesNumberProps, 'density', false),
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: _.get(particlesNumberProps, 'limit.mode', 'delete'),
            value: _.get(particlesNumberProps, 'limit.value', particlesNumberLimitDefault),
          },
        },
        opacity: {
          value: _.get(particlesOpacityProps, 'value', particlesOpacityDefault),
          animation: {
            sync: false,
            enable: !!_.get(particlesOpacityProps, 'animation', false),
            count: _.get(particlesOpacityProps, 'animation.count', 0),
            speed: _.get(particlesOpacityProps, 'animation.speed', 50),
            decay: _.get(particlesOpacityProps, 'animation.decay', 0),
            delay: _.get(particlesOpacityProps, 'animation.delay', 0),
            mode: _.get(particlesOpacityProps, 'animation.mode', 'random'),
            startValue: _.get(particlesOpacityProps, 'animation.startValue', 'min'),
            destroy: _.get(particlesOpacityProps, 'animation.destroy', 'none'),
          },
        },
        size: {
          value: _.get(particlesSizeProps, 'value', particlesSizeDefault),
          animation: {
            sync: false,
            enable: !!_.get(particlesSizeProps, 'animation', false),
            count: _.get(particlesSizeProps, 'animation.count', 0),
            speed: _.get(particlesSizeProps, 'animation.speed', 20),
            decay: _.get(particlesSizeProps, 'animation.decay', 0),
            delay: _.get(particlesSizeProps, 'animation.delay', 0),
            mode: _.get(particlesSizeProps, 'animation.mode', 'random'),
            startValue: _.get(particlesSizeProps, 'animation.startValue', 'min'),
            destroy: _.get(particlesSizeProps, 'animation.destroy', 'none'),
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: !!_.get(options, 'mouseRepulse', false),
            mode: 'repulse',
          },
          onClick: {
            enable: !!_.get(options, 'clickPush', false),
            mode: 'push',
          },
        },
        modes: {
          repulse: {
            distance: _.isBoolean(options.mouseRepulse) ? 200 : options.mouseRepulse,
          },
          push: {
            quantity: _.isBoolean(options.clickPush) ? 4 : options.clickPush,
          },
        },
      },
    }

    return new ParticlesBuilder(props, options.id, options.autoPush)
  }

  private async init() {
    await initParticlesEngine(async (engine) => await loadSlim(engine))

    this.autoPush()
  }

  private autoPush() {
    if (!this._autoPush) return
    const mode = _.get(this._autoPush, 'mode', this._autoPush) as TParticleAutoPushMode

    switch (mode) {
      case 'random':
        this.randomPush(_.get(this._autoPush, 'quantity', 1))
        break
      case 'empty':
        this.emptyPush(_.get(this._autoPush, 'quantity', 1))
        break
      default:
        this.intervalPush(mode, _.get(this._autoPush, 'quantity', 1))
        break
    }
  }

  private randomPush(numParticles: number) {
    const randomDelay = Math.random() * (4000 - 500) + 500

    setTimeout(() => {
      this.particlesPush(numParticles)
      this.randomPush(numParticles)
    }, randomDelay)
  }

  private emptyPush(numParticles: number) {
    if (!this._container) return setTimeout(() => this.emptyPush(numParticles), 250)
    if (this._container.particles.count === 0) {
      this.particlesPush(numParticles)
    }

    setTimeout(() => this.emptyPush(numParticles), 250)
  }

  private intervalPush(interval: number, numParticles: number) {
    setTimeout(() => {
      this.particlesPush(numParticles)
      this.intervalPush(interval, numParticles)
    }, interval)
  }

  public async particlesLoaded(container?: Container) {
    this._container = container
  }

  public async particlesPush(numParticles: number) {
    if (!this._container) return
    this._container.particles.push(numParticles)
  }

  public get id() {
    return this._id
  }

  public get options() {
    return this._props
  }

  public canvas(props: TParticleCanvasProps) {
    return <Particles id={this._id} particlesLoaded={this.particlesLoaded} options={this.options} {...props} />
  }
}
