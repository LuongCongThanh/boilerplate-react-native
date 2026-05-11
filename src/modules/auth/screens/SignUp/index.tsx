import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {Text, TextButton, TextType} from 'src/components'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'
import {COLORS, sizeScale} from 'src/styles'
import FacebookLogin from './components/FacebookLogin'
import GoogleLogin from './components/GoogleLogin'
import SignUpForm from './components/SignUpForm'
import styles from './styles'
import Separator from '../components/Separator'

const SignUp = () => {
  const {t} = useTranslation()

  const navigation = useAppNavigation()

  const handlePressSignUp = useCallback(() => {
    navigation.navigate(AppRoutes.SignUp)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text
          textType={TextType.title}
          style={{marginBottom: sizeScale(8)}}>
          {t('auth.signUp.content')}
        </Text>
        <Text textType={TextType.body3} color={COLORS.gray}>
          {t('auth.signUp.caption')}
        </Text>
      </View>

      <SignUpForm />

      <Separator style={{marginVertical: sizeScale(24)}} />

      <GoogleLogin />

      <FacebookLogin />

      <View style={styles.createAccount}>
        <Text textType={TextType.body3} weight="500" color={COLORS.gray}>
          {t('auth.signUp.haveAccount')}
        </Text>
        <TextButton
          textType={TextType.body3}
          weight="500"
          text={t('auth.signIn.title')}
          onPress={handlePressSignUp}
        />
      </View>
    </View>
  )
}

export default SignUp
