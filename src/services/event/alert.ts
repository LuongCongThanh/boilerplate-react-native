import {DeviceEventEmitter} from 'react-native'

import {AppEvent} from 'src/constants/events'
import {IErrorBody} from 'src/model/common'

export interface IErrorBus {
  show(error: IErrorBody): void
  subscribe(handler: (error: IErrorBody) => void): () => void
}

export function createErrorBus(): IErrorBus {
  return {
    show(error) {
      DeviceEventEmitter.emit(AppEvent.Error, error)
    },
    subscribe(handler) {
      const subscription = DeviceEventEmitter.addListener(
        AppEvent.Error,
        handler
      )
      return () => subscription.remove()
    }
  }
}

export const errorBus = createErrorBus()
