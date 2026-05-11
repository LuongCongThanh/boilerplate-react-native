const font = {
  weights: {
    '300': 'Light',
    '400': 'Regular',
    '500': 'Medium',
    '600': 'SemiBold',
    '700': 'Bold',
    '800': 'ExtraBold',
    '900': 'Black'
  },
  types: {
    primary: 'Inter',
    secondary: 'Inter'
  }
}

export type FontType = keyof typeof font.types
export type FontWeight = keyof typeof font.weights

export type FontOption = {
  weight: FontWeight
  type: FontType
}

export const fontMaker = (option: Partial<FontOption>) => {
  let weight = option.weight ?? '400'
  let type = option.type ?? 'primary'

  const fontFamily = `${font.types[type]}-${font.weights[weight]}`
  return {fontFamily}
}
