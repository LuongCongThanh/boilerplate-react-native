export enum AuthRoutes {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
  VerifyOTP = 'VerifyOTP',
  CreateNewPassword = 'CreateNewPassword'
}

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: undefined
  [AuthRoutes.SignUp]: undefined
  [AuthRoutes.ForgotPassword]: undefined
  [AuthRoutes.VerifyOTP]: undefined
  [AuthRoutes.CreateNewPassword]: undefined
}
