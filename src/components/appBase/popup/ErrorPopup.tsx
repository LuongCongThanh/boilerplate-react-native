import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import Modal from 'src/components/core/Modal'
import View from 'src/components/core/View'
import ErrorCircle from 'src/assets/img/common/svg/error-circle.svg'
import {StyleSheet} from 'react-native'
import {COLORS, sizeScale} from 'src/styles'
import AppAlert from 'src/services/event/alert'
import {IErrorBody} from 'src/model/common'

import Text, {TextType} from '../Text'

const ErrorPopup = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [data, setData] = useState<IErrorBody>({
    title: 'common.errorPopup.title',
    message: 'common.errorPopup.generalMessage'
  })

  const {t} = useTranslation()

  const {title, message} = data

  const show = useCallback(() => setIsVisible(true), [])

  const hide = useCallback(() => setIsVisible(false), [])

  const onError = useCallback(
    (errorData: IErrorBody) => {
      if (isVisible) {
        return
      }

      setData({
        title: errorData.title ?? 'common.errorPopup.title',
        message: errorData.message ?? 'common.errorPopup.generalMessage'
      })

      show()
    },
    [isVisible, show]
  )

  useEffect(() => {
    const unsubscribe = AppAlert.registerErrorListener(onError)

    return () => unsubscribe.remove()
  }, [onError])

  return (
    <Modal isVisible={isVisible} onBackdropPress={hide}>
      <View style={styles.container} padding="32, 48">
        <ErrorCircle />

        <Text
          margin="32, 0, 8, 0"
          textType={TextType.h1}
          weight="600"
          textAlign="center">
          {t(title as any)}
        </Text>
        <Text
          margin="0, 0, 32, 0"
          textType={TextType.body3}
          color={COLORS.gray500}
          textAlign="center">
          {t(message as any)}
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItem: 'center',
    borderRadius: sizeScale(48),
    alignItems: 'center'
  }
})

export default React.memo(ErrorPopup)
