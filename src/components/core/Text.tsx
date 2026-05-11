import React, {useMemo} from 'react'
import {Text as RNText, TextProps, TextStyle} from 'react-native'

import {
  fontMaker,
  sizeFont,
  FontType,
  FontWeight,
  COLORS
} from 'src/styles'

export enum TextType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  header = 'header',
  title = 'title',
  body1 = 'body1',
  body2 = 'body2',
  body3 = 'body3',
  caption = 'caption',
  button = 'button'
}

const TEXT_PRESETS: Record<TextType, {size: number; weight: FontWeight; color: string}> = {
  [TextType.h1]: {size: 20, weight: '700', color: COLORS.primary},
  [TextType.h2]: {size: 18, weight: '700', color: COLORS.primary},
  [TextType.h3]: {size: 16, weight: '700', color: COLORS.primary},
  [TextType.h4]: {size: 14, weight: '700', color: COLORS.primary},
  [TextType.header]: {size: 20, weight: '600', color: COLORS.primary},
  [TextType.title]: {size: 20, weight: '600', color: COLORS.primary},
  [TextType.body1]: {size: 18, weight: '400', color: COLORS.primary},
  [TextType.body2]: {size: 16, weight: '400', color: COLORS.primary},
  [TextType.body3]: {size: 14, weight: '400', color: COLORS.primary},
  [TextType.caption]: {size: 12, weight: '400', color: COLORS.primary},
  [TextType.button]: {size: 16, weight: '500', color: COLORS.white}
}

export type Props = {
  textType?: TextType
  weight?: FontWeight
  size?: number
  color?: string
  lineHeight?: number
  textAlign?: TextStyle['textAlign']
  style?: TextProps['style']
  fontType?: FontType
} & TextProps

const Text = ({
  textType,
  weight,
  size,
  color,
  lineHeight,
  textAlign,
  children,
  style,
  fontType,
  ...props
}: Props) => {
  const preset = useMemo(
    () => (textType ? TEXT_PRESETS[textType] : undefined),
    [textType]
  )

  const resolvedWeight = weight ?? preset?.weight
  const resolvedSize = size ?? preset?.size ?? 16
  const resolvedColor = color ?? preset?.color

  const restStyle = Array.isArray(style) ? style : [style]

  return (
    <RNText
      {...props}
      style={[
        {
          ...fontMaker({weight: resolvedWeight, type: fontType}),
          fontSize: sizeFont(resolvedSize)
        },
        resolvedColor ? {color: resolvedColor} : undefined,
        lineHeight ? {lineHeight: sizeFont(lineHeight)} : undefined,
        textAlign ? {textAlign} : undefined,
        ...restStyle
      ]}>
      {children}
    </RNText>
  )
}

export default Text
