declare module '*.svg' {
  import {SvgProps} from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}

declare module '*.png'

declare module 'react-native-actionsheet' {
  import React from 'react'

  export interface ActionSheetProps {
    title?: string
    message?: string
    options: string[]
    cancelButtonIndex?: number
    destructiveButtonIndex?: number
    onPress: (index: number) => void
    [key: string]: unknown
  }

  export default class ActionSheet extends React.Component<ActionSheetProps> {
    show(): void
  }
}
