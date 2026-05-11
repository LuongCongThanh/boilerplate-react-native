import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {useAppNavigation} from 'src/routes'
import {TextButton, Text, TextType, OTPInputField, RoundButton, AppLogo} from 'src/components'
import {AppRoutes} from 'src/routes/routes'
import {COLORS, sizeScale} from 'src/styles'
import {otpValidationSchema, OTPFormValues} from 'src/modules/auth/constants/validator'

import styles from './styles'

const VerifyOTP = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const methods = useForm<OTPFormValues>({
    resolver: zodResolver(otpValidationSchema),
    defaultValues: {code: ''}
  })

  const handleResendCode = useCallback(() => {}, [])

  const handleVerifyCode = (_values: OTPFormValues) => {
    navigation.navigate(AppRoutes.CreateNewPassword)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AppLogo />
        <Text
          textType={TextType.title}
          style={{marginTop: sizeScale(42), marginBottom: sizeScale(16)}}>
          {t('auth.verifyOTP.title')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray} textAlign="center">
          {t('auth.verifyOTP.caption')}
        </Text>
      </View>

      <FormProvider {...methods}>
        <OTPInputField name="code" />
        <RoundButton
          style={{marginTop: sizeScale(4)}}
          text={t('auth.forgotPassword.verify')}
          onPress={() => methods.handleSubmit(handleVerifyCode)()}
        />
      </FormProvider>

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
