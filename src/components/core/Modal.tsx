import React, {FC} from 'react'
import RNModal, {ModalProps} from 'react-native-modal'

export type Props = Partial<ModalProps>

const Modal: FC<Props> = ({children, ...props}) => (
  <RNModal
    animationIn="fadeIn"
    animationOut="fadeOut"
    animationInTiming={200}
    animationOutTiming={200}
    backdropOpacity={0.5}
    {...props}>
    {children}
  </RNModal>
)

export default Modal
