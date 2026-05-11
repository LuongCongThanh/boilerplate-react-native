import React from 'react'
import {StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native'

export type Props = {
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  borderWidth?: number
  borderColor?: string
} & TouchableOpacityProps

const Button = ({
  children,
  style,
  backgroundColor,
  borderWidth,
  borderColor,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        backgroundColor ? {backgroundColor} : undefined,
        borderWidth ? {borderWidth} : undefined,
        borderColor ? {borderColor} : undefined,
        ...(Array.isArray(style) ? style : [style])
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  )
}

export default Button
