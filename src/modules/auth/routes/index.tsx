import {AuthRoutes} from './routes'

import {StackScreenConfig} from 'src/routes/routes'
import SignIn from 'src/modules/auth/screens/SignIn'
import SignUp from 'src/modules/auth/screens/SignUp'
import ForgotPassword from 'src/modules/auth/screens/ForgotPassword'
import VerifyOTP from 'src/modules/auth/screens/ForgotPassword/VerifyOTP'
import CreateNewPassword from 'src/modules/auth/screens/ForgotPassword/CreateNewPassword'

export const AUTH_SCREENS: StackScreenConfig[] = [
  {
    name: AuthRoutes.SignIn,
    component: SignIn,
    options: {
      headerShown: false
    }
  },
  {
    name: AuthRoutes.SignUp,
    component: SignUp,
    options: {
      headerShown: false
    }
  },
  {
    name: AuthRoutes.ForgotPassword,
    component: ForgotPassword
  },
  {
    name: AuthRoutes.VerifyOTP,
    component: VerifyOTP
  },
  {
    name: AuthRoutes.CreateNewPassword,
    component: CreateNewPassword
  }
]
