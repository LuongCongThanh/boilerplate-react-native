import React from 'react'
import {} from 'react-native-vector-icons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import {sizeFont} from 'src/styles'
import {ViewStyle} from 'react-native'
import {IconProps} from 'react-native-vector-icons/Icon'

const VectorIcons = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
  Zocial
}

export type Props = {
  type?: string
  size?: number
  name: string
  color?: string
  style?: ViewStyle
} & IconProps

const VectorIcon = (props: Props) => {
  const {
    type = 'MaterialCommunityIcons',
    size = 12,
    name,
    color,
    ...rest
  } = props

  const Icon = VectorIcons[type as keyof typeof VectorIcons]
  return <Icon size={sizeFont(size)} name={name} color={color} {...rest} />
}

export default VectorIcon
