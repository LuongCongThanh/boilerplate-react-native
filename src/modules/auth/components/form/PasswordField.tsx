import React, {FC, useCallback, useState} from 'react'
import {COLORS, sizeScale} from 'src/styles'

import IconButton from 'src/components/core/IconButton'
import InputField, {Props as InputFieldProps} from './InputField'

export type Props = {
  placeholder?: string
  name: string
  iconName?: string
} & InputFieldProps

const PasswordField: FC<Props> = ({placeholder, name, iconName, ...rest}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = useCallback(() => {
    setShowPassword((current) => !current)
  }, [])

  return (
    <InputField
      suffix={
        <IconButton
          style={{
            paddingTop: sizeScale(10),
            paddingBottom: sizeScale(10),
            paddingLeft: sizeScale(10)
          }}
          name={showPassword ? 'eye-off' : 'eye'}
          color={COLORS.lightGray}
          size={18}
          onPress={handleShowPassword}
        />
      }
      secureTextEntry={!showPassword}
      name={name}
      iconName={iconName}
      placeholder={placeholder}
      {...rest}
    />
  )
}

export default PasswordField
