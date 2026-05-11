import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import Text, {Props as TextProps, TextType} from 'src/components/core/Text'
import Button, {Props as ButtonProps} from 'src/components/core/Button'
import View from 'src/components/core/View'
import {COLORS, FontWeight, sizeScale} from 'src/styles'

export type TextButtonProps = {
  text: string
  textType?: TextType
  color?: string
  weight?: FontWeight
  textProps?: TextProps
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
  ...rest
}) => {
  return (
    <Button style={styles.roundButton} {...rest}>
      <Text textType={textType} color={color} weight={weight} {...textProps}>
        {text}
      </Text>
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
  ...rest
}) => {
  return (
    <Button style={styles.socialLoginButton} {...rest}>
      <View margin="0, 10, 0, 0">{icon}</View>
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
