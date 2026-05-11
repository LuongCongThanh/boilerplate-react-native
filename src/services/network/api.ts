import {isAxiosError, InternalAxiosRequestConfig} from 'axios'
import {API_URL} from '@env'

import {store} from 'src/store'
import {logout} from 'src/modules/auth/store/slice/auth'

import Http, {Interceptor} from './http'

class Api extends Http {
  constructor() {
    super()
    this.configRequest()
    this.configResponse()
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

  private configResponse() {
    this.addResponseInterceptor({
      onFulfilled: (response) => response,
      onRejected: (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          store.dispatch(logout())
        }
        return Promise.reject(error)
      }
    })
  }
}

export default new Api()
