import React, {FC} from 'react'
import {StyleSheet} from 'react-native'

import OTPInputCore, {Props as OTPInputProps} from '../core/OTPInput'
import {COLORS, sizeFont, sizeScale} from 'src/styles'

export type props = {
  pinCount?: number
  autoFocusOnLoad?: boolean
} & Partial<OTPInputProps>

const OTPInput: FC<props> = ({
  pinCount = 5,
  autoFocusOnLoad = false,
  ...rest
}) => {
  return (
    <OTPInputCore
      codeInputFieldStyle={styles.codeInput}
      codeInputHighlightStyle={styles.codeInputHighlight}
      pinCount={pinCount}
      autoFocusOnLoad={autoFocusOnLoad}
      style={styles.inputContainer}
      {...rest}
    />
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
