export type IHttpMethod =
  | 'get'
  | 'head'
  | 'patch'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'

export type IResponseType  =
  | 'json'
  | 'blob'
  | 'text'
  | 'arrayBuffer'

export interface IOptionsFetch {
  method?: IHttpMethod
  query?: object
  body?: object
  headers?: object
  baseURL?: string
  responseType?: IResponseType
}

export interface IGeneralResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}

export interface IErrorResponse {
  status_code: number
  status_message: string
  success: boolean
}

const useDefaultFetch = async <T>(url: string, opts: IOptionsFetch): Promise<T> => {
  const config = useRuntimeConfig()

  return $fetch<T>(url, {
    responseType: opts.responseType ?? 'json',
    method: opts.method,
    query: opts.query,
    body: opts.body,
    baseURL: opts.baseURL ?? config.public.apiBase as string,
    headers: {
      ...opts.headers
    },
    onRequest({ request, options }) {
      console.log(request, 'request global')

      const headers = new Headers(options.headers)
      if (config.public.accessToken) {
        headers.set('Authorization', `Bearer ${config.public.accessToken}`)
      }
      options.headers = headers
    },
    onResponse({ response }) {
      console.log(response, 'response global')

      return response._data
    },
    async onResponseError({ response }) {
      console.log(response, 'error global')

      throw response._data.error as IErrorResponse
    }
  })
}

export const useGetFetch = <T>(url: string, opts?: IOptionsFetch): Promise<T> => {
  return useDefaultFetch<T>(url, {
    ...opts,
    method: 'get'
  })
}