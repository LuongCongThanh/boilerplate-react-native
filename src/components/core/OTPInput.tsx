import React, {FC} from 'react'
import OTPInputView, {InputProps} from '@twotalltotems/react-native-otp-input'
import {ViewStyle} from 'react-native'
import View from './View'

export type Props = {
  containerStyle?: ViewStyle
  margin?: string
  padding?: string
} & InputProps

const OTPInput: FC<Props> = ({containerStyle, margin, padding, ...rest}) => {
  return (
    <View style={containerStyle} margin={margin} padding={padding}>
      <OTPInputView {...rest} />
    </View>
  )
}

export default OTPInput
