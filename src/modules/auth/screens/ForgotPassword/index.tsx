import React, {useCallback} from 'react'
import {GestureResponderEvent, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Formik} from 'formik'

import {AppLogo, InputField, RoundButton} from 'src/components'
import Text, {TextType} from 'src/components/appBase/Text'
import {COLORS} from 'src/styles'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'

import styles from './styles'
import {forgetPasswordSchema} from '../../constants/validator'

const INIT_LOGIN_FORM_VALUES = {email: ''}

interface FormValues {
  email: string
}

const ForgotPassword = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  const handleSendCode = useCallback(() => {
    navigation.navigate(AppRoutes.VerifyOTP)
  }, [])

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

      <Formik<FormValues>
        initialValues={INIT_LOGIN_FORM_VALUES}
        onSubmit={handleSendCode}
        validationSchema={forgetPasswordSchema}
        validateOnChange>
        {({handleSubmit}) => (
          <>
            <InputField
              placeholder={t('auth.signIn.placeholderEmail')}
              iconName="email-outline"
              name="email"
              autoCapitalize="none"
            />

            <RoundButton
              margin="4, 0, 0, 0"
              text={t('auth.forgotPassword.sendCode')}
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

export default ForgotPassword
