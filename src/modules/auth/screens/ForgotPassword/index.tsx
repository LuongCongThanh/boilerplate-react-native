import React, {useCallback} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {AppLogo, InputField, RoundButton} from 'src/components'
import Text, {TextType} from 'src/components/core/Text'
import {COLORS} from 'src/styles'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'
import {
  forgetPasswordSchema,
  ForgotPasswordFormValues
} from '../../constants/validator'
import styles from './styles'

const ForgotPassword = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {email: ''}
  })

  const handleSendCode = useCallback(
    (_values: ForgotPasswordFormValues) => {
      navigation.navigate(AppRoutes.VerifyOTP)
    },
    [navigation]
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AppLogo />
        <Text textType={TextType.title} margin="42, 0, 8, 0">
          {t('auth.forgotPassword.title')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray} textAlign="center">
          {t('auth.forgotPassword.content')}
        </Text>
      </View>

      <FormProvider {...methods}>
        <InputField
          placeholder={t('auth.signIn.placeholderEmail')}
          iconName="email-outline"
          name="email"
          autoCapitalize="none"
        />
        <RoundButton
          margin="4, 0, 0, 0"
          text={t('auth.forgotPassword.sendCode')}
          onPress={() => methods.handleSubmit(handleSendCode)()}
        />
      </FormProvider>
    </View>
  )
}

export default ForgotPassword
