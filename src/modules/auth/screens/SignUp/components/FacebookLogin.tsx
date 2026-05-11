import React from 'react'
import {useTranslation} from 'react-i18next'

import FacebookIcon from 'src/assets/img/auth/svg/ic_facebook.svg'
import {SocialLoginButton} from 'src/components'
import {sizeScale} from 'src/styles'

export type Props = {}

const FacebookLogin = ({}: Props) => {
  const {t} = useTranslation()
  return (
    <SocialLoginButton
      icon={<FacebookIcon />}
      text={t('auth.signUp.loginFacebook')}
      style={{marginTop: sizeScale(20)}}
    />
  )
}
export default React.memo(FacebookLogin)
