import React, {FC} from 'react'
import {ActivityIndicator, StyleProp, StyleSheet, ViewStyle} from 'react-native'
import Button, {Props as ButtonProps} from 'src/components/core/Button'
import Text, {Props as TextProps, TextType} from 'src/components/core/Text'
import View from 'src/components/core/View'
import {COLORS, FontWeight, sizeScale} from 'src/styles'

export type TextButtonProps = {
  text: string
  textType?: TextType
  color?: string
  weight?: FontWeight
  textProps?: TextProps
  isLoading?: boolean
} & ButtonProps

export type SocialLoginButtonProps = {
  icon: React.ReactNode
} & TextButtonProps

export const TextButton: FC<TextButtonProps> = ({
  text,
  textType = TextType.body3,
  color = COLORS.blue,
  weight = '500',
  textProps,
  ...rest
}) => {
  return (
    <Button {...rest}>
      <Text textType={textType} color={color} weight={weight} {...textProps}>
        {text}
      </Text>
    </Button>
  )
}

export const RoundButton: FC<TextButtonProps> = ({
  text,
  textType = TextType.button,
  color = COLORS.white,
  weight = '500',
  textProps,
  isLoading,
  style,
  ...rest
}) => {
  return (
    <Button
      style={[styles.roundButton, style as StyleProp<ViewStyle>]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text textType={textType} color={color} weight={weight} {...textProps}>
          {text}
        </Text>
      )}
    </Button>
  )
}

export const SocialLoginButton: FC<SocialLoginButtonProps> = ({
  icon,
  text,
  textType = TextType.body3,
  color = COLORS.primary,
  weight = '500',
  textProps,
  style,
  ...rest
}) => {
  return (
    <Button
      style={[styles.socialLoginButton, style as StyleProp<ViewStyle>]}
      {...rest}
    >
      <View style={{marginRight: sizeScale(10)}}>{icon}</View>
      <Text textType={textType} color={color} weight={weight} {...textProps}>
        {text}
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: COLORS.primary,
    height: sizeScale(48),
    borderRadius: sizeScale(24),
    alignItems: 'center',
    justifyContent: 'center'
  },

  socialLoginButton: {
    backgroundColor: COLORS.white,
    height: sizeScale(50),
    borderRadius: sizeScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: sizeScale(1),
    borderColor: COLORS.lightGray,
    flexDirection: 'row'
  }
})
