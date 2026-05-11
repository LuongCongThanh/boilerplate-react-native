import {API_URL} from '@env'

import {store} from 'src/store'
import {logout} from 'src/modules/auth/store/slice/auth'

import {createHttpClient} from './http'

const api = createHttpClient({
  baseURL: API_URL,
  getToken: () => store.getState().auth?.token,
  onUnauthorized: () => store.dispatch(logout())
})

export default api
