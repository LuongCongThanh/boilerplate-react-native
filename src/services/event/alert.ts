import {DeviceEventEmitter, EmitterSubscription} from 'react-native'

import {AppEvent} from 'src/constants/events'
import {IErrorBody} from 'src/model/common'

class AppAlert {
  static registerErrorListener = (
    handler: (data: IErrorBody) => void
  ): EmitterSubscription => {
    return DeviceEventEmitter.addListener(AppEvent.Error, handler)
  }

  static showError = (data: IErrorBody) => {
    DeviceEventEmitter.emit(AppEvent.Error, data)
  }
}

export default AppAlert
