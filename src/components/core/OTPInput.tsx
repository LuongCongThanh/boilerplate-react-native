import React, {FC} from 'react'
import OTPInputView, {InputProps} from '@twotalltotems/react-native-otp-input'
import {ViewStyle, StyleSheet} from 'react-native'

import {COLORS, sizeFont, sizeScale} from 'src/styles'
import View from './View'

export type Props = {
  containerStyle?: ViewStyle
  pinCount?: number
  autoFocusOnLoad?: boolean
} & Omit<InputProps, 'pinCount' | 'autoFocusOnLoad'>

const OTPInput: FC<Props> = ({
  containerStyle,
  pinCount = 5,
  autoFocusOnLoad = false,
  ...rest
}) => {
  return (
    <View style={containerStyle}>
      <OTPInputView
        codeInputFieldStyle={styles.codeInput}
        codeInputHighlightStyle={styles.codeInputHighlight}
        pinCount={pinCount}
        autoFocusOnLoad={autoFocusOnLoad}
        style={styles.inputContainer}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    height: sizeScale(56)
  },
  codeInput: {
    width: sizeScale(56),
    height: sizeScale(56),
    borderRadius: sizeScale(12),
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.gray100,
    fontSize: sizeFont(24),
    color: COLORS.primary
  },
  codeInputHighlight: {
    borderColor: COLORS.primary,
    borderWidth: sizeScale(2)
  }
})

export default OTPInput
