import {Dimensions, PixelRatio} from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width

const guidelineBaseWidth = 375

const SIZES = new Array(1000)
  .fill(null)
  .map((_e: null, idx: number) => Math.round((WINDOW_WIDTH / guidelineBaseWidth) * idx))

export const sizeScale = (size: number) =>
  SIZES[size] || Math.round((WINDOW_WIDTH / guidelineBaseWidth) * size)

export const sizeFont = (size: number) => size * PixelRatio.getFontScale()
