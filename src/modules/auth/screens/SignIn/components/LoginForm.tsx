import React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {PasswordField, InputField, RoundButton} from 'src/components'
import {login} from 'src/modules/auth/store/slice/auth'
import {
  loginValidationSchema,
  LoginFormValues
} from 'src/modules/auth/constants/validator'
import {sizeScale} from 'src/styles'

const LoginForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {email: '', password: ''}
  })

  const handleSignIn = (_values: LoginFormValues) => {
    dispatch(login({token: 'test-key'}))
  }

  return (
    <FormProvider {...methods}>
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
      <RoundButton
        style={{marginTop: sizeScale(4)}}
        text={t('auth.signIn.title')}
        onPress={() => methods.handleSubmit(handleSignIn)()}
      />
    </FormProvider>
  )
}

export default React.memo(LoginForm)
