/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {View, StyleSheet} from 'react-native'

import {AppNavigator} from './routes'
import {useAppLanguage} from './hooks/multiLanguage'
import {COLORS} from './styles'
import {ErrorPopup} from './components'

function App(): JSX.Element {
  useAppLanguage()

  return (
    <View style={styles.container}>
      <AppNavigator />
      <ErrorPopup />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})

export default App
