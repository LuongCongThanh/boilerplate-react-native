import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import {
  withVersioning,
  VersioningStrategy,
  IWithVersioningConfig
} from 'axios-api-versioning'

export interface Interceptor<V> {
  onFulfilled?: (value: V) => V | Promise<V>
  onRejected?: (error: unknown) => unknown
}

export default class Http {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    this.setVersioning()
  }

  addRequestInterceptor(interceptor: Interceptor<InternalAxiosRequestConfig>) {
    this.instance.interceptors.request.use(
      interceptor?.onFulfilled,
      interceptor?.onRejected
    )
  }

  addResponseInterceptor(interceptor: Interceptor<AxiosResponse>) {
    this.instance.interceptors.response.use(
      interceptor?.onFulfilled,
      interceptor?.onRejected
    )
  }

  setVersioning(
    config: IWithVersioningConfig = {
      apiVersion: '1',
      versioningStrategy: VersioningStrategy.UrlPath
    }
  ) {
    this.instance = withVersioning(
      this.instance,
      config
    ) as unknown as AxiosInstance
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(url, config)
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(url, data, config)
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(url, data, config)
  }

  patch<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(url, data, config)
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(url, config)
  }
}
