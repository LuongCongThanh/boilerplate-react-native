import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {COLORS, sizeScale} from 'src/styles'
import IconButton from './IconButton'
import Text, {TextType} from './Text'

type Props = NativeStackHeaderProps

const Header = (props: Props) => {
  const {t} = useTranslation()
  const {options, navigation} = props
  const {title, headerRight, headerTitleAlign, headerTintColor} = options

  const canGoBack = navigation.canGoBack()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, height: insets.top + sizeScale(50)}
      ]}>
      <View style={styles.left}>
        {canGoBack && (
          <IconButton
            padding="10,0,10,10"
            name="arrow-left"
            color={COLORS.primary}
            size={24}
            onPress={navigation.goBack}
          />
        )}
      </View>

      <View style={styles.titleContainer}>
        {title && (
          <Text
            textType={TextType.header}
            textAlign={headerTitleAlign ?? 'center'}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {t(title as any)}
          </Text>
        )}
      </View>

      <View style={styles.right}>
        {headerRight ? headerRight({canGoBack, tintColor: headerTintColor}) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeScale(14),
    backgroundColor: COLORS.white
  },
  left: {
    width: sizeScale(50)
  },
  right: {
    width: sizeScale(50)
  },
  titleContainer: {
    flex: 1
  }
})

export default Header
