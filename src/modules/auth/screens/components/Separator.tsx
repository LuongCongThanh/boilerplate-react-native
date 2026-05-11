import React from 'react'
import {StyleSheet, ViewProps} from 'react-native'
import {useTranslation} from 'react-i18next'

import {COLORS, sizeScale} from 'src/styles'
import {Text, TextType, View} from 'src/components'

const Separator = (props: ViewProps) => {
  const {t} = useTranslation()

  return (
    <View style={[styles.separator, props.style]}>
      <View style={styles.line} />
      <Text
        textType={TextType.body2}
        color={COLORS.gray500}
        style={{marginHorizontal: sizeScale(24)}}
        weight="500">
        {t('auth.signIn.or')}
      </Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    height: sizeScale(1),
    flex: 1,
    backgroundColor: COLORS.gray200
  }
})

export default React.memo(Separator)
