import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet} from 'react-native'

import Modal from './Modal'
import View from './View'
import Text, {TextType} from './Text'
import ErrorCircle from 'src/assets/img/common/svg/error-circle.svg'
import {COLORS, sizeScale} from 'src/styles'
import AppAlert from 'src/services/event/alert'
import {IErrorBody} from 'src/model/common'

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
      if (isVisible) return
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
      <View style={styles.container}>
        <ErrorCircle />
        <Text
          style={{marginTop: sizeScale(32), marginBottom: sizeScale(8)}}
          textType={TextType.h1}
          weight="600"
          textAlign="center">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t(title as any)}
        </Text>
        <Text
          style={{marginBottom: sizeScale(32)}}
          textType={TextType.body3}
          color={COLORS.gray500}
          textAlign="center">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t(message as any)}
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: sizeScale(48),
    alignItems: 'center',
    paddingVertical: sizeScale(32),
    paddingHorizontal: sizeScale(48)
  }
})

export default React.memo(ErrorPopup)
