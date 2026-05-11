import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text, TextType, Icon} from 'src/components'
import {COLORS, sizeScale} from 'src/styles'

export type Props = {
  leftIcon?: React.ReactNode
  title?: string
  rightIcon?: React.ReactNode
  size?: number
  name: string
  color?: string
}

const SettingItem = ({
  leftIcon,
  title,
  rightIcon,
  size = 24,
  name,
  color = COLORS.primary,
  ...rest
}: Props) => {
  return (
    <Button style={styles.cardContainer} {...rest}>
      {leftIcon ?? (
        <Icon name={name} color={color} size={size} style={styles.leftIcon} />
      )}
      <Text color={COLORS.gray} textType={TextType.body1} style={styles.title}>
        {title}
      </Text>
      {rightIcon ?? (
        <Icon
          name="chevron-right"
          size={24}
          color={COLORS.gray}
          style={styles.rightIcon}
        />
      )}
    </Button>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: sizeScale(24)
  },
  title: {
    flex: 1
  },
  leftIcon: {
    width: sizeScale(24),
    height: sizeScale(24),
    marginRight: sizeScale(16)
  },
  rightIcon: {
    marginLeft: sizeScale(16)
  }
})

export default SettingItem
