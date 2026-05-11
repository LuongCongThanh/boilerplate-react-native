import React from 'react'
import {useTranslation} from 'react-i18next'

import FacebookIcon from 'src/assets/img/auth/svg/ic_facebook.svg'
import {SocialLoginButton} from 'src/components'

export type Props = {}

const FacebookLogin = ({}: Props) => {
  const {t} = useTranslation()
  return (
    <SocialLoginButton
      icon={<FacebookIcon />}
      text={t('auth.signUp.loginFacebook')}
      margin="20, 0, 0, 0"
    />
  )
}
export default React.memo(FacebookLogin)
