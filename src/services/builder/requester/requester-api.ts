import type { IApi } from '@/interfaces/api'
import type { ILoader } from '@/interfaces/loader'
import type { Nullish } from '@/utils/nullish'

export abstract class RequesterApi<TApiInstance, TProps = unknown> implements IApi {
  private apiInstance: Nullish<TApiInstance>
  protected readonly loader: ILoader
  protected readonly props: TProps

  constructor(loader: ILoader, props: TProps) {
    this.props = props
    this.loader = loader
  }

  protected set api(instance: TApiInstance) {
    this.apiInstance = instance
  }

  protected get api() {
    if (!this.apiInstance) throw new Error('API instance is not initialized')
    return this.apiInstance
  }

  abstract get<T>(url: string, config?: Record<string, unknown>): Promise<T>
  abstract put<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T>
  abstract post<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T>
  abstract patch<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T>
  abstract delete<T>(url: string, config?: Record<string, unknown>): Promise<T>
}
