import React, {FC, useEffect} from 'react'
import {StyleSheet, ViewStyle, Keyboard, EmitterSubscription} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Controller, useFormContext} from 'react-hook-form'

import {COLORS, sizeScale} from 'src/styles'
import View from 'src/components/core/View'
import Text, {TextType} from 'src/components/core/Text'
import OTPInput, {Props as OTPInputProps} from 'src/components/core/OTPInput'

export type Props = OTPInputProps & {
  margin?: string
  padding?: string
  name: string
  containerStyle?: ViewStyle
}

const OTPInputField: FC<Props> = ({
  margin = '0, 0, 8, 0',
  padding,
  name,
  containerStyle,
  ...rest
}) => {
  const {
    control,
    formState: {errors},
    setValue,
    trigger
  } = useFormContext()
  const {t} = useTranslation()

  const errorMsg = errors[name]?.message as string | undefined

  useEffect(() => {
    let unsubscribe: EmitterSubscription
    if (name) {
      unsubscribe = Keyboard.addListener('keyboardDidHide', () =>
        trigger(name)
      )
    }
    return () => unsubscribe?.remove()
  }, [name, trigger])

  return (
    <View margin={margin} padding={padding} style={containerStyle}>
      <Controller
        control={control}
        name={name}
        render={({field: {value}}) => (
          <OTPInput
            onCodeChanged={code => setValue(name, code, {shouldValidate: true})}
            code={value as string}
            {...rest}
          />
        )}
      />
      <Text textType={TextType.caption} color={COLORS.red} style={styles.error}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {errorMsg ? t(errorMsg as any) : ''}
      </Text>
    </View>
  )
}

export default OTPInputField

const styles = StyleSheet.create({
  error: {
    minHeight: sizeScale(14),
    lineHeight: sizeScale(14)
  }
})
