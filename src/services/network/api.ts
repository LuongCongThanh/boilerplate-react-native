import {InternalAxiosRequestConfig} from 'axios'
import {API_URL} from '@env'

import {store} from 'src/store'

import Http, {Interceptor} from './http'

class Api extends Http {
  constructor() {
    super()
    this.configRequest()
  }

  private configRequest() {
    this.addRequestInterceptor({
      onFulfilled: (config) => {
        const {auth} = store.getState()

        const token = auth?.token

        return {
          ...config,
          headers: token
            ? {...config.headers, Authorization: `Bearer ${token}`}
            : config.headers,

          baseURL: API_URL
        }
      }
    } as Interceptor<InternalAxiosRequestConfig>)
  }
}

export default new Api()
