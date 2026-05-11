import React, {FC} from 'react'
import {StyleSheet, ViewStyle} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useField} from 'formik'

import TextInput, {Props as TextInputProps} from 'src/components/core/TextInput'
import {COLORS, sizeScale} from 'src/styles'

import Text, {TextType} from '../Text'
import Icon from '../../core/Icon'
import View from 'src/components/core/View'

export type Props = TextInputProps & {
  margin?: string
  padding?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  iconName?: string
  name: string
  containerStyle?: ViewStyle
}

const PrefixIcon = ({iconName}: {iconName: string}) => {
  return (
    <Icon
      name={iconName}
      color={COLORS.lightGray}
      size={18}
      style={styles.leftIcon}
    />
  )
}

const InputField: FC<Props> = ({
  margin = '0, 0, 8, 0',
  padding,
  name,
  prefix,
  iconName,
  placeholder,
  suffix,
  containerStyle,
  ...rest
}) => {
  const [field, meta] = useField(name)
  const {onChange, onBlur} = field
  const {touched, error, value} = meta

  const errorMsg = touched && error ? error : ''
  const {t} = useTranslation()

  return (
    <View margin={margin} padding={padding} style={containerStyle}>
      <TextInput
        suffix={suffix}
        prefix={iconName ? <PrefixIcon iconName={iconName} /> : prefix}
        placeholder={placeholder}
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={value}
        containerStyle={styles.input}
        {...rest}
      />
      <Text textType={TextType.caption} color={COLORS.red} style={styles.error}>
        {t(errorMsg as any)}
      </Text>
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.lightGray,
    borderWidth: sizeScale(1),
    height: sizeScale(40),
    borderRadius: sizeScale(8),
    alignItems: 'center',
    paddingHorizontal: sizeScale(16)
  },
  leftIcon: {
    marginRight: sizeScale(5)
  },
  error: {
    minHeight: sizeScale(14),
    lineHeight: sizeScale(14)
  }
})
