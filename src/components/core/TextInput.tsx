import React, {FC} from 'react'
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
  StyleSheet
} from 'react-native'

export type Props = {
  containerStyle?: ViewStyle
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & TextInputProps

const TextInput: FC<Props> = ({
  containerStyle,
  prefix,
  suffix,
  style,
  ...rest
}) => {
  const restStyle = Array.isArray(style) ? style : [style]

  return (
    <View style={[styles.container, containerStyle]}>
      {prefix}
      <RNTextInput style={[styles.textInput, ...restStyle]} {...rest} />
      {suffix}
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 1
  }
})
