import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {withVersioning, VersioningStrategy} from 'axios-api-versioning'

export interface IHttpClient {
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
}

export interface HttpClientConfig {
  baseURL: string
  apiVersion?: string
  getToken?: () => string | null | undefined
  onUnauthorized?: () => void
}

export function createHttpClient(config: HttpClientConfig): IHttpClient {
  const {baseURL, apiVersion = '1', getToken, onUnauthorized} = config

  let instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  instance = withVersioning(instance, {
    apiVersion,
    versioningStrategy: VersioningStrategy.UrlPath
  }) as unknown as typeof instance

  instance.interceptors.request.use((requestConfig) => {
    const token = getToken?.()
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`
    }
    return requestConfig
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        onUnauthorized
      ) {
        onUnauthorized()
      }
      return Promise.reject(error)
    }
  )

  return {
    get: (url, reqConfig) => instance.get(url, reqConfig),
    post: (url, data, reqConfig) => instance.post(url, data, reqConfig),
    put: (url, data, reqConfig) => instance.put(url, data, reqConfig),
    patch: (url, data, reqConfig) => instance.patch(url, data, reqConfig),
    delete: (url, reqConfig) => instance.delete(url, reqConfig)
  }
}
