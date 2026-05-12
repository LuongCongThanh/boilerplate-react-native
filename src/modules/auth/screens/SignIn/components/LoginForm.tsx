import React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {PasswordField, InputField, RoundButton} from 'src/components'
import {loginAsync} from 'src/modules/auth/store/slice/auth'
import {
  loginValidationSchema,
  LoginFormValues
} from 'src/modules/auth/constants/validator'
import {sizeScale} from 'src/styles'
import {AppDispatch} from 'src/store'
import {selectAuthIsLoading} from 'src/store/selectors'

const LoginForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector(selectAuthIsLoading)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {email: '', password: ''}
  })

  const handleSignIn = async (values: LoginFormValues) => {
    await dispatch(
      loginAsync({username: values.email, password: values.password})
    )
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
        isLoading={isLoading}
        onPress={() => methods.handleSubmit(handleSignIn)()}
      />
    </FormProvider>
  )
}

export default React.memo(LoginForm)
