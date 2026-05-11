export enum AuthRoutes {
  // auth
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
  VerifyOTP = 'VerifyOTP',
  CreateNewPassword = 'CreateNewPassword'
}

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: any
  [AuthRoutes.SignUp]: any
  [AuthRoutes.ForgotPassword]: any
  [AuthRoutes.VerifyOTP]: any
  [AuthRoutes.CreateNewPassword]: any
}
