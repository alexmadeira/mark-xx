import type {
  TRequesterFetchProps,
  // TRequesterMutateProps,
  TRequesterPathParams,
  TRequesterPaths,
  TRequesterPathSchema,
  TRequesterPrismicQueryParams,
  TRequesterProps,
  TRequesterQueryDataToFetchProps,
  TRequesterQueryProps,
} from '@/services/builder/requester'

import _ from 'lodash'

import { useRequester } from '_STR/useRequester'

export class Requester<TPaths extends TRequesterPaths> {
  constructor(private readonly props: TRequesterProps<TPaths>) {}

  private queryDataToFetch<K extends keyof TPaths>(
    ...[queryData, params, signal, body]: TRequesterQueryDataToFetchProps<TPaths, K>
  ): TRequesterFetchProps<TPaths, K> {
    const httpParams = params as TRequesterPathParams<TPaths, K>
    const prismicParams = params as TRequesterPrismicQueryParams

    const request = queryData.path || prismicParams.type
    if (!request) throw new Error('Requester: path or type is required in the request configuration.')

    return {
      body,
      request,
      method: queryData.method,
      schema: queryData.schema,
      config: {
        signal,
        params: httpParams,
        uid: prismicParams?.uid,
        tags: prismicParams?.tags,
      },
    }
  }

  private async fetch<TResponse, K extends keyof TPaths>(props: TRequesterFetchProps<TPaths, K>): Promise<TResponse> {
    switch (props.method) {
      case 'get':
      case 'delete':
        return await this.api[props.method](props.request, props.config)
      case 'put':
      case 'post':
      case 'patch':
        return await this.api[props.method](props.request, props.body, props.config)
    }
  }

  private get api() {
    return this.props.api
  }

  private get paths() {
    return this.props.paths
  }

  private get queryClient() {
    return this.props.queryClient
  }

  // public async mutate<K extends keyof TPaths>(request: K, ...[body]: TRequesterMutateProps) {
  //   // await useRequester.waitFor('cache.restoreStatus', 'restored')
  //   // return await this.fetch<TRequesterPathSchema<TPaths, K>, K>({
  //   //   req: this.paths[request],
  //   //   body,
  //   //   // params,
  //   // })
  // }

  public async query<K extends keyof TPaths>(request: K, ...[queryKey, params]: TRequesterQueryProps<TPaths, K>) {
    await useRequester.waitFor('cache.restoreStatus', 'restored')

    const result = await this.queryClient.ensureQueryData({
      ...this.paths[request],
      queryKey: _.castArray(queryKey),
      queryFn: async ({ signal }) =>
        await this.fetch<TRequesterPathSchema<TPaths, K>, K>(
          this.queryDataToFetch<K>(this.paths[request], params, signal),
        ),
    })

    return result
  }
}
