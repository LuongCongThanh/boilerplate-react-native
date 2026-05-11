import React, {FC, useEffect} from 'react'
import {
  StyleSheet,
  ViewStyle,
  Keyboard,
  EmitterSubscription
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useField} from 'formik'

import {COLORS, sizeScale} from 'src/styles'
import View from 'src/components/core/View'

import Text, {TextType} from '../Text'
import OTPInput, {props as OTPInputProps} from '../OTPInput'

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
  const [field, meta, helpers] = useField(name)
  const {onChange} = field
  const {touched, error, value} = meta
  const {setTouched} = helpers

  const errorMsg = touched && error ? error : ''
  const {t} = useTranslation()

  useEffect(() => {
    let unsubscribe: EmitterSubscription
    if (name) {
      unsubscribe = Keyboard.addListener('keyboardDidHide', () =>
        setTouched(true, true)
      )
    }

    return () => unsubscribe?.remove()
  }, [name, setTouched])

  return (
    <View margin={margin} padding={padding} style={containerStyle}>
      <OTPInput onCodeChanged={onChange(name)} code={value} {...rest} />
      <Text textType={TextType.caption} color={COLORS.red} style={styles.error}>
        {t(errorMsg as any)}
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
