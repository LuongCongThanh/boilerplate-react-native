import React from 'react'
import {StyleSheet, ViewStyle} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { COLORS } from 'src/styles'

type Options = {
  containerStyle: ViewStyle
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  }
})

const defaultOptions: Options = {
  containerStyle: styles.container
}

export const withSafeAreaView =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    options: Options = defaultOptions
  ) =>
  (props: P) => {
    const {containerStyle} = options

    return (
      <SafeAreaView style={containerStyle}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    )
  }
