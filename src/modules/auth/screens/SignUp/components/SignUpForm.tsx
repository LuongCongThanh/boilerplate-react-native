import React from 'react'
import {useTranslation} from 'react-i18next'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {PasswordField, InputField, RoundButton} from 'src/components'
import {
  signUpValidationSchema,
  SignUpFormValues
} from 'src/modules/auth/constants/validator'

const SignUpForm = () => {
  const {t} = useTranslation()

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {username: '', email: '', password: '', confirmPassword: ''}
  })

  const handleSignUp = (_values: SignUpFormValues) => {}

  return (
    <FormProvider {...methods}>
      <InputField
        placeholder={t('auth.signUp.placeholderUser')}
        iconName="account-outline"
        name="username"
        autoCapitalize="none"
      />
      <InputField
        placeholder={t('auth.signIn.placeholderEmail')}
        iconName="email-outline"
        name="email"
        autoCapitalize="none"
      />
      <PasswordField
        placeholder={t('auth.signIn.placeholderPassword')}
        name="password"
        iconName="lock-outline"
        autoCapitalize="none"
      />
      <PasswordField
        placeholder={t('auth.signIn.placeholderConfirmPassword')}
        name="confirmPassword"
        iconName="lock-outline"
        autoCapitalize="none"
      />
      <RoundButton
        margin="20, 0, 0, 0"
        text={t('auth.signUp.content')}
        onPress={() => methods.handleSubmit(handleSignUp)()}
      />
    </FormProvider>
  )
}

export default React.memo(SignUpForm)
