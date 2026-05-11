import React from 'react'
import {GestureResponderEvent} from 'react-native/types'
import {useTranslation} from 'react-i18next'
import {Formik} from 'formik'

import {PasswordField, InputField, RoundButton} from 'src/components'
import {signUpValidationSchema} from 'src/modules/auth/constants/validator'

const INIT_SIGNUP_FORM_VALUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const {t} = useTranslation()

  const handleSignUp = () => {}

  return (
    <Formik
      initialValues={INIT_SIGNUP_FORM_VALUES}
      onSubmit={handleSignUp}
      validationSchema={signUpValidationSchema}
      validateOnChange>
      {({handleSubmit}) => (
        <>
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
            onPress={
              handleSubmit as unknown as (e: GestureResponderEvent) => void
            }
          />
        </>
      )}
    </Formik>
  )
}

export default React.memo(SignUpForm)
