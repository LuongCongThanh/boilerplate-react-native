import React, {useMemo} from 'react'
import {COLORS} from 'src/styles'
import CoreText, {Props as CoreTextProps} from '../core/Text'

export enum TextType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  header = 'header',
  title = 'title',
  body1 = 'body1',
  body2 = 'body2',
  body3 = 'body3',
  caption = 'caption',
  button = 'button'
}

const TEXT_TYPES = {
  [TextType.h1]: {
    size: 20,
    weight: '700',
    color: COLORS.primary
  },
  [TextType.h2]: {
    size: 18,
    weight: '700',
    color: COLORS.primary
  },
  [TextType.h3]: {
    size: 16,
    weight: '700',
    color: COLORS.primary
  },
  [TextType.h4]: {
    size: 14,
    weight: '700',
    color: COLORS.primary
  },
  [TextType.header]: {
    size: 20,
    weight: '600',
    color: COLORS.primary
  },
  [TextType.title]: {
    size: 20,
    weight: '600',
    color: COLORS.primary
  },
  [TextType.body1]: {
    size: 18,
    weight: '400',
    color: COLORS.primary
  },
  [TextType.body2]: {
    size: 16,
    weight: '400',
    color: COLORS.primary
  },
  [TextType.body3]: {
    size: 14,
    weight: '400',
    color: COLORS.primary
  },
  [TextType.caption]: {
    size: 12,
    weight: '400',
    color: COLORS.primary
  },
  [TextType.button]: {
    size: 16,
    weight: '500',
    color: COLORS.white
  }
}

export type Props = CoreTextProps & {
  textType?: TextType
}

const Text = ({textType = TextType.body2, children, ...restProps}: Props) => {
  const propsByType = useMemo(
    () => TEXT_TYPES[textType],
    [textType]
  ) as Partial<CoreTextProps>

  return (
    <CoreText {...propsByType} {...restProps}>
      {children}
    </CoreText>
  )
}

export default Text
