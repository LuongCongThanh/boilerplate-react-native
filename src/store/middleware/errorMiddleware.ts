import {isRejected} from '@reduxjs/toolkit'
import {Middleware} from '@reduxjs/toolkit'

import {errorBus} from 'src/services/event/alert'
import {normalizeError} from 'src/services/network/errorHandler'

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action) && action.payload !== undefined) {
    errorBus.show(normalizeError(action.payload))
  }
  return next(action)
}
