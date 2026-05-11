import React from 'react'
import {TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native'

import {margin as addMargin, padding as addPadding} from 'src/styles'

export type Props = {
  style?: ViewStyle
  backgroundColor?: string
  margin?: string
  padding?: string
  borderWidth?: number
  borderColor?: string
} & TouchableOpacityProps

const Button = ({
  children,
  style,
  backgroundColor,
  margin,
  padding,
  borderWidth,
  borderColor,
  ...rest
}: Props) => {
  const restStyle = Array.isArray(style) ? style : [style]

  return (
    <TouchableOpacity
      style={[
        backgroundColor ? {backgroundColor} : undefined,
        margin ? addMargin(margin) : undefined,
        padding ? addPadding(padding) : undefined,
        borderWidth ? {borderWidth} : undefined,
        borderColor ? {borderColor} : undefined,
        ...restStyle
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  )
}

export default Button
