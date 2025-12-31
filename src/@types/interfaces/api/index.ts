export type TApiGet = <T>(url: string, config?: Record<string, unknown>) => Promise<T>
export type TApiPut = <T>(url: string, data?: unknown, config?: Record<string, unknown>) => Promise<T>
export type TApiPost = <T>(url: string, data?: unknown, config?: Record<string, unknown>) => Promise<T>
export type TApiPatch = <T>(url: string, data?: unknown, config?: Record<string, unknown>) => Promise<T>
export type TApiDelete = <T>(url: string, config?: Record<string, unknown>) => Promise<T>

export interface IApi {
  get: TApiGet
  put: TApiPut
  post: TApiPost
  patch: TApiPatch
  delete: TApiDelete
}
