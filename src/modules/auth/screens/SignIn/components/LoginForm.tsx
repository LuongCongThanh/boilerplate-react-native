import React from 'react'
import {GestureResponderEvent} from 'react-native/types'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {Formik} from 'formik'
import {PasswordField, InputField, RoundButton} from 'src/components'
import {login} from 'src/modules/auth/store/slice/auth'
import {loginValidationSchema} from 'src/modules/auth/constants/validator'

interface FormValues {
  email: string
  password: string
}

const INIT_LOGIN_FORM_VALUES = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const handleSignIn = async (_values: FormValues) => {
    dispatch(login({token: 'test-key'}))
  }

  return (
    <Formik<FormValues>
      initialValues={INIT_LOGIN_FORM_VALUES}
      onSubmit={handleSignIn}
      validationSchema={loginValidationSchema}
      validateOnChange>
      {({handleSubmit}) => (
        <>
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
            margin="4, 0, 0, 0"
            text={t('auth.signIn.title')}
            onPress={
              handleSubmit as unknown as (e: GestureResponderEvent) => void
            }
          />
        </>
      )}
    </Formik>
  )
}

export default React.memo(LoginForm)
