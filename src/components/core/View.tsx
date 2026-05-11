import React, {FC} from 'react'
import {View as RNView, ViewProps} from 'react-native'

export type Props = {
  backgroundColor?: string
  borderColor?: string
} & ViewProps

const View: FC<Props> = ({
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
        backgroundColor ? {backgroundColor} : undefined,
        borderColor ? {borderColor} : undefined,
        ...restStyle
      ]}>
      {children}
    </RNView>
  )
}

export default View
