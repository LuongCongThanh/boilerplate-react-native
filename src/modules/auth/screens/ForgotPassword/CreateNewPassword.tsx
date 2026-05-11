import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import Text, {TextType} from 'src/components/appBase/Text'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'
import {COLORS} from 'src/styles'
import {AppLogo, PasswordField, RoundButton} from 'src/components'
import {
  createNewPasswordValidationSchema,
  CreateNewPasswordFormValues
} from 'src/modules/auth/constants/validator'

import styles from './styles'

const CreateNewPassword = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const methods = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordValidationSchema),
    defaultValues: {password: '', confirmPassword: ''}
  })

  const handleResetPassword = useCallback(
    (_values: CreateNewPasswordFormValues) => {
      navigation.navigate(AppRoutes.VerifyOTP)
    },
    [navigation]
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AppLogo />
        <Text textType={TextType.title} margin="42, 0, 16, 0">
          {t('auth.createNewPassword.title')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray} textAlign="center">
          {t('auth.createNewPassword.caption')}
        </Text>
      </View>

      <FormProvider {...methods}>
        <PasswordField
          placeholder={t('auth.createNewPassword.placeholderPassword')}
          name="password"
          iconName="lock-outline"
          autoCapitalize="none"
        />
        <PasswordField
          placeholder={t('auth.createNewPassword.placeholderConfirmPassword')}
          name="confirmPassword"
          iconName="lock-outline"
          autoCapitalize="none"
        />
        <RoundButton
          margin="4, 0, 0, 0"
          text={t('auth.createNewPassword.resetPassword')}
          onPress={() => methods.handleSubmit(handleResetPassword)()}
        />
      </FormProvider>
    </View>
  )
}

export default CreateNewPassword
