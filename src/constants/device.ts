import { Dimensions, Platform } from 'react-native'

export const IS_ANDROID = Platform.OS === 'android'

export const IS_IOS = Platform.OS === 'ios'

const screen = Dimensions.get('window')
export const SCREEN_HEIGHT = screen.height
export const SCREEN_WIDTH = screen.width

export const IS_SHORT_SCREEN = SCREEN_HEIGHT / SCREEN_WIDTH < 1.8
