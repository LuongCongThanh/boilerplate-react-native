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
import {AppDispatch, RootState} from 'src/store'
import AppAlert from 'src/services/event/alert'
import {normalizeError} from 'src/services/network/errorHandler'

const LoginForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {email: '', password: ''}
  })

  const handleSignIn = async (values: LoginFormValues) => {
    const result = await dispatch(
      loginAsync({username: values.email, password: values.password})
    )
    if (loginAsync.rejected.match(result)) {
      AppAlert.showError(normalizeError(result.payload))
    }
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
