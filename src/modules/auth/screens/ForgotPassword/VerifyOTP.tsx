import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {GestureResponderEvent, View} from 'react-native'
import {Formik} from 'formik'

import {useAppNavigation} from 'src/routes'
import {
  TextButton,
  Text,
  TextType,
  OTPInputField,
  RoundButton,
  AppLogo
} from 'src/components'
import {AppRoutes} from 'src/routes/routes'
import {COLORS} from 'src/styles'
import {otpValidationSchema} from 'src/modules/auth/constants/validator'

import styles from './styles'

interface FormValues {
  code: string
}

const INIT_FORM_VALUES = {code: ''}

const VerifyOTP = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const handleResendCode = useCallback(() => {}, [])

  const handleVerifyCode = (_values: FormValues) => {
    navigation.navigate(AppRoutes.CreateNewPassword)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AppLogo />
        <Text textType={TextType.title} margin="42, 0, 16, 0">
          {t('auth.verifyOTP.title')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray} textAlign="center">
          {t('auth.verifyOTP.caption')}
        </Text>
      </View>

      <Formik<FormValues>
        initialValues={INIT_FORM_VALUES}
        onSubmit={handleVerifyCode}
        validationSchema={otpValidationSchema}
        validateOnChange>
        {({handleSubmit}) => (
          <>
            <OTPInputField name="code" />
            <RoundButton
              margin="4, 0, 0, 0"
              text={t('auth.forgotPassword.verify')}
              onPress={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            />
          </>
        )}
      </Formik>

      <View style={styles.createAccount}>
        <Text textType={TextType.body3} weight="500" color={COLORS.gray}>
          {t('auth.verifyOTP.didNotGetCode')}
        </Text>
        <TextButton
          textType={TextType.body3}
          weight="500"
          text={t('auth.verifyOTP.resend')}
          onPress={handleResendCode}
        />
      </View>
    </View>
  )
}

export default VerifyOTP
