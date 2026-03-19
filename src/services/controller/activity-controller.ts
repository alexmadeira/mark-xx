import type {
  TActivityCreateMonitorProps,
  TActivityEvents,
  TActivityHandleActivityProps,
  TActivityMonitorCancels,
  TActivityMonitorEvents,
  TActivityProps,
  TActivityRouteActivityProps,
} from '@/services/controller/activity'
import type { ITimer } from '@/services/utils/timer'

import _ from 'lodash'

import { interfaceEvent } from '_SRV/builder/event'

import { useActivity } from '_STR/useActivity'

export class ActivityController {
  private readonly monitorEvents: TActivityMonitorEvents
  private readonly monitorCancels: TActivityMonitorCancels
  private readonly activityEvents: TActivityEvents

  private readonly activityActions = useActivity.getState().actions

  constructor(
    private readonly timer: ITimer,
    private readonly props: TActivityProps = {},
  ) {
    this.monitorEvents = new Map()
    this.monitorCancels = new Map()
    this.activityEvents = new Set()

    _.bindAll(this, ['createMonitor', 'handleActivity', 'routeActivity', 'resetMonitor', 'handleVisibility'])
  }

  private get defaultStatus() {
    return this.props.defautStatus ?? 'active'
  }

  private get debounceDelay() {
    return this.props.debounceDelay ?? 200
  }

  public createMonitor(...[name, monitor]: TActivityCreateMonitorProps) {
    this.activityActions.setMonitor(name, {
      ...monitor,
      status: monitor.status ?? this.defaultStatus,
    })

    monitor.events.forEach((event) => {
      if (!this.monitorEvents.has(event)) this.monitorEvents.set(event, new Set())

      this.monitorEvents.get(event)!.add(name)

      if (!this.activityEvents.has(event)) {
        window.addEventListener(event, this.handleActivity, { passive: true })
        this.activityEvents.add(event)
      }
    })

    this.resetMonitor(name)
  }

  private handleActivity(...[event]: TActivityHandleActivityProps) {
    this.timer.throttle('ACTIVITY_CONTROLLER:routeActivity', this.routeActivity, this.debounceDelay, event)
  }

  public start() {
    document.addEventListener('visibilitychange', this.handleVisibility)

    Object.keys(useActivity.getState().data.monitors).forEach((name) => this.resetMonitor(name))
  }

  public stop() {
    document.removeEventListener('visibilitychange', this.handleVisibility)

    this.monitorCancels.forEach((cancel) => cancel())
    this.monitorCancels.clear()

    this.activityEvents.forEach((event) => window.removeEventListener(event, this.handleActivity))

    this.activityEvents.clear()
    this.monitorEvents.clear()
  }

  private routeActivity(...[event]: TActivityRouteActivityProps) {
    if (document.hidden) return
    this.monitorEvents.get(event.type)?.forEach((name) => this.resetMonitor(name))
  }

  private resetMonitor(name: string) {
    const monitor = useActivity.getState().data.monitors[name]

    if (!monitor) return

    this.monitorCancels.get(name)?.()
    this.monitorCancels.delete(name)

    if (monitor.status === 'idle') {
      this.activityActions.setStatus(name, 'active')
      interfaceEvent.emit('INTERFACE:Activity:active')
      interfaceEvent.emit('INTERFACE:Activity:update', 'active')
    }

    this.monitorCancels.set(
      name,
      this.timer.delay(() => {
        this.activityActions.setStatus(name, 'idle')
        interfaceEvent.emit('INTERFACE:Activity:idle')
        interfaceEvent.emit('INTERFACE:Activity:update', 'idle')
      }, monitor.timeout),
    )
  }

  private handleVisibility = () => {
    if (document.hidden) return

    Object.keys(useActivity.getState().data.monitors).forEach((name) => this.resetMonitor(name))
  }
}
