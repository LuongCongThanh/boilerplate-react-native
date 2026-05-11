import React from 'react'
import {useTranslation} from 'react-i18next'

import GoogleIcon from 'src/assets/img/auth/svg/ic_google.svg'
import {SocialLoginButton} from 'src/components'

export type Props = {}

const GoogleLogin = ({}: Props) => {
  const {t} = useTranslation()
  return (
    <SocialLoginButton
      icon={<GoogleIcon />}
      text={t('auth.signIn.loginGoogle')}
    />
  )
}
export default React.memo(GoogleLogin)
