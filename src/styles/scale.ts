/* eslint-disable @typescript-eslint/default-param-last */
import {Dimensions, PixelRatio, ViewStyle} from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width

const guidelineBaseWidth = 375

const SIZES = new Array(1000)
  .fill(null)
  .map((_e: null, idx: number) => Math.round((WINDOW_WIDTH / guidelineBaseWidth) * idx))

export const sizeScale = (size: number) =>
  SIZES[size] || Math.round((WINDOW_WIDTH / guidelineBaseWidth) * size)

export const sizeFont = (size: number) => size * PixelRatio.getFontScale()

const dimensions = (
  top: number,
  right = top,
  bottom = top,
  left = right,
  property: string
): ViewStyle => {
  return {
    [`${property}Top`]: sizeScale(top),
    [`${property}Right`]: sizeScale(right),
    [`${property}Bottom`]: sizeScale(bottom),
    [`${property}Left`]: sizeScale(left)
  } as ViewStyle
}

export const margin = (dimension: string = '0') => {
  const [top, right = top, bottom = top, left = right]: number[] = dimension
    .split(',')
    .map(Number)

  return dimensions(top, right, bottom, left, 'margin')
}

export const padding = (dimension: string = '0') => {
  const [top, right = top, bottom = top, left = right]: number[] = dimension
    .split(',')
    .map(Number)

  return dimensions(top, right, bottom, left, 'padding')
}
