import React, {FC} from 'react'
import {View as RNView, ViewProps} from 'react-native'

import {margin as addMargin, padding as addPadding} from 'src/styles'

export type Props = {
  margin?: string
  padding?: string
  backgroundColor?: string
  borderColor?: string
} & ViewProps

const View: FC<Props> = ({
  margin,
  padding,
  children,
  style,
  backgroundColor,
  borderColor,
  ...props
}) => {
  const restStyle = Array.isArray(style) ? style : [style]

  return (
    <RNView
      {...props}
      style={[
        margin ? addMargin(margin) : undefined,
        padding ? addPadding(padding) : undefined,
        backgroundColor ? {backgroundColor} : undefined,
        borderColor ? {borderColor} : undefined,
        ...restStyle
      ]}>
      {children}
    </RNView>
  )
}

export default View
