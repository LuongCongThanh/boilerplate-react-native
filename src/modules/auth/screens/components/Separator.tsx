import React from 'react'
import {StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {COLORS, sizeScale} from 'src/styles'
import {Text, TextType, View, ViewProps} from 'src/components'

const Separator = (props: ViewProps) => {
  const {t} = useTranslation()

  return (
    <View style={styles.separator} {...props}>
      <View style={styles.line} />
      <Text
        textType={TextType.body2}
        color={COLORS.gray500}
        margin="0,24"
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
