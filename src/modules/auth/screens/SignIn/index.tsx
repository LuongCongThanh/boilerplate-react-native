/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {AppLogo, Text, TextButton, TextType} from 'src/components'
import {COLORS, sizeScale} from 'src/styles'
import {AppRoutes} from 'src/routes/routes'
import {useAppNavigation} from 'src/routes'
import styles from './styles'
import LoginForm from './components/LoginForm'
import GoogleLogin from './components/GoogleLogin'
import FacebookLogin from './components/FacebookLogin'
import Separator from '../components/Separator'

const SignIn = () => {
  const {t} = useTranslation()

  const navigation = useAppNavigation()

  const handlePressForgotPassword = useCallback(() => {
    navigation.navigate(AppRoutes.ForgotPassword)
  }, [])

  const handlePressSignUp = useCallback(() => {
    navigation.navigate(AppRoutes.SignUp)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <AppLogo />
        <Text
          textType={TextType.title}
          style={{marginTop: sizeScale(32), marginBottom: sizeScale(8)}}>
          {t('auth.signIn.content')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray}>
          {t('auth.signIn.caption')}
        </Text>
      </View>

      <LoginForm />

      <Separator style={{marginVertical: sizeScale(24)}} />

      <GoogleLogin />

      <FacebookLogin />

      <TextButton
        textType={TextType.body3}
        weight="500"
        text={t('auth.signIn.forgotPassword')}
        onPress={handlePressForgotPassword}
        style={styles.forgotPassword}
      />

      <View style={styles.createAccount}>
        <Text textType={TextType.body3} weight="500" color={COLORS.gray}>
          {t('auth.signIn.haveNotAccount')}
        </Text>
        <TextButton
          textType={TextType.body3}
          weight="500"
          text={t('auth.signUp.title')}
          onPress={handlePressSignUp}
        />
      </View>
    </View>
  )
}

export default SignIn
