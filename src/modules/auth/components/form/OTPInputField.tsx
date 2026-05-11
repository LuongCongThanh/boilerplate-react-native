import React, {FC, useEffect} from 'react'
import {StyleSheet, ViewStyle, Keyboard, EmitterSubscription} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Controller, useFormContext} from 'react-hook-form'

import {COLORS, sizeScale} from 'src/styles'
import View from 'src/components/core/View'
import Text, {TextType} from 'src/components/core/Text'
import OTPInput, {Props as OTPInputProps} from 'src/components/core/OTPInput'

export type Props = OTPInputProps & {
  name: string
  containerStyle?: ViewStyle
}

const OTPInputField: FC<Props> = ({
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
    <View style={[styles.wrapper, containerStyle]}>
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
  wrapper: {
    marginBottom: sizeScale(8)
  },
  error: {
    minHeight: sizeScale(14),
    lineHeight: sizeScale(14)
  }
})
