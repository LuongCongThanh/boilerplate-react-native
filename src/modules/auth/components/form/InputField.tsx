import React, {FC} from 'react'
import {StyleSheet, ViewStyle} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Controller, useFormContext} from 'react-hook-form'

import TextInput, {Props as TextInputProps} from 'src/components/core/TextInput'
import Text, {TextType} from 'src/components/core/Text'
import Icon from 'src/components/core/Icon'
import View from 'src/components/core/View'
import {COLORS, sizeScale} from 'src/styles'

export type Props = TextInputProps & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  placeholder?: string
  iconName?: string
  name: string
  containerStyle?: ViewStyle
}

const PrefixIcon = ({iconName}: {iconName: string}) => (
  <Icon
    name={iconName}
    color={COLORS.lightGray}
    size={18}
    style={styles.leftIcon}
  />
)

const InputField: FC<Props> = ({
  name,
  prefix,
  iconName,
  placeholder,
  suffix,
  containerStyle,
  ...rest
}) => {
  const {
    control,
    formState: {errors}
  } = useFormContext()
  const {t} = useTranslation()

  const errorMsg = errors[name]?.message as string | undefined

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            suffix={suffix}
            prefix={iconName ? <PrefixIcon iconName={iconName} /> : prefix}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value as string}
            containerStyle={styles.input}
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

export default InputField

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: sizeScale(8)
  },
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
