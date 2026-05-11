import React from 'react'
import {StyleSheet} from 'react-native'

import Icon from 'src/components/core/Icon'
import View from 'src/components/core/View'
import Text from 'src/components/core/Text'
import {COLORS} from 'src/styles'

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Icon
        type="Ionicons"
        name="logo-react"
        size={80}
        color={COLORS.primary}
      />

      <Text color={COLORS.gray500} margin="10, 0, 0, 0">
        {'React Native '}
        <Text weight="600" color={COLORS.primary}>
          Boilerplate
        </Text>
      </Text>
    </View>
  )
}

export default React.memo(AppLogo)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})
