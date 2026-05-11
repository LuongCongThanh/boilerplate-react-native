import React from 'react'
import Button, {Props as ButtonProps} from 'src/components/core/Button'
import Icon, {Props as IconProps} from 'src/components/core/Icon'

export type Props = {
  icon?: JSX.Element
  iconProps?: IconProps
  type?: string
  size?: number
  name: string
  color?: string
} & ButtonProps

const IconButton = ({
  icon,
  iconProps,
  type,
  size,
  name,
  color,
  ...rest
}: Props) => {
  return (
    <Button {...rest}>
      {icon ?? (
        <Icon
          type={type}
          size={size}
          color={color}
          name={name}
          {...iconProps}
        />
      )}
    </Button>
  )
}

export default IconButton
