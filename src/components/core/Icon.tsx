import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {ViewStyle} from 'react-native'
import {IconProps} from 'react-native-vector-icons/Icon'
import {sizeFont} from 'src/styles'

const VectorIcons = {
  Ionicons,
  MaterialCommunityIcons
}

export type IconType = keyof typeof VectorIcons

export type Props = {
  type?: IconType
  size?: number
  name: string
  color?: string
  style?: ViewStyle
} & IconProps

const VectorIcon = ({
  type = 'MaterialCommunityIcons',
  size = 12,
  name,
  color,
  ...rest
}: Props) => {
  const Icon = VectorIcons[type]
  return <Icon size={sizeFont(size)} name={name} color={color} {...rest} />
}

export default VectorIcon
