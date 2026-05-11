import React from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'

import {
  margin as addMargin,
  padding as addPadding,
  fontMaker,
  FontType,
  FontWeight,
  sizeFont
} from 'src/styles'

export type Props = {
  weight?: FontWeight
  size?: number
  color?: string
  lineHeight?: number
  textAlign?: TextStyle['textAlign']
  margin?: string
  padding?: string
  style?: TextProps['style']
  fontType?: FontType
} & TextProps

const Text = ({
  weight,
  size = 16,
  color,
  lineHeight,
  textAlign,
  margin,
  padding,
  children,
  style,
  fontType,
  ...props
}: Props) => {
  const restStyle = Array.isArray(style) ? style : [style]

  return (
    <RNText
      {...props}
      style={[
        {
          ...fontMaker({weight, type: fontType}),
          fontSize: sizeFont(size)
        },
        color ? {color} : undefined,
        lineHeight ? {lineHeight: sizeFont(lineHeight)} : undefined,
        textAlign ? {textAlign} : undefined,
        margin ? addMargin(margin) : undefined,
        padding ? addPadding(padding) : undefined,
        ...restStyle
      ]}>
      {children}
    </RNText>
  )
}

export default Text
