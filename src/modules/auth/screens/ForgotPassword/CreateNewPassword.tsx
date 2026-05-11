import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {GestureResponderEvent, View} from 'react-native'
import {Formik} from 'formik'

import Text, {TextType} from 'src/components/appBase/Text'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'
import {COLORS} from 'src/styles'
import {AppLogo, PasswordField, RoundButton} from 'src/components'
import {createNewPasswordValidationSchema} from 'src/modules/auth/constants/validator'

import styles from './styles'

interface FormValues {
  password: string
  confirmPassword: string
}

const INIT_CREATE_NEW_PASSWORD_VALUES = {password: '', confirmPassword: ''}

const CreateNewPassword = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const handleResetPassword = useCallback(() => {
    navigation.navigate(AppRoutes.VerifyOTP)
  }, [])

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

      <Formik<FormValues>
        initialValues={INIT_CREATE_NEW_PASSWORD_VALUES}
        onSubmit={handleResetPassword}
        validationSchema={createNewPasswordValidationSchema}
        validateOnChange>
        {({handleSubmit}) => (
          <>
            <PasswordField
              placeholder={t('auth.createNewPassword.placeholderPassword')}
              name="password"
              iconName="lock-outline"
              autoCapitalize="none"
            />
            <PasswordField
              placeholder={t(
                'auth.createNewPassword.placeholderConfirmPassword'
              )}
              name="confirmPassword"
              iconName="lock-outline"
              autoCapitalize="none"
            />

            <RoundButton
              margin="4, 0, 0, 0"
              text={t('auth.createNewPassword.resetPassword')}
              onPress={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            />
          </>
        )}
      </Formik>
    </View>
  )
}

export default CreateNewPassword
