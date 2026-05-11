import * as Yup from 'yup'

const SHAPE = {
  EMAIL: Yup.string()
    .email('auth.errors.email.invalid')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
      'auth.errors.email.invalid'
    )
    .required('auth.errors.email.required'),
  PASSWORD_REQUIRED: Yup.string().required('auth.errors.password.required'),
  USERNAME: Yup.string().required('auth.errors.username.required'),
  PASSWORD: Yup.string()
    .min(8, 'auth.errors.password.minimumCharacters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'auth.errors.password.hardPassword'
    )
    .required('auth.errors.password.required'),
  CONFIRM_PASSWORD: Yup.string()
    .oneOf([Yup.ref('password')], 'auth.errors.password.notMatch')
    .required('auth.errors.password.requiredConfirmPassword'),
  OTP_CODE: Yup.string()
    .length(5, 'auth.errors.otp.length')
    .required('auth.errors.otp.required')
}

const loginValidationSchema = Yup.object().shape({
  email: SHAPE.EMAIL,
  password: SHAPE.PASSWORD_REQUIRED
})

const signUpValidationSchema = Yup.object().shape({
  username: SHAPE.USERNAME,
  email: SHAPE.EMAIL,
  password: SHAPE.PASSWORD,
  confirmPassword: SHAPE.CONFIRM_PASSWORD
})

const otpValidationSchema = Yup.object().shape({
  code: SHAPE.OTP_CODE
})

const forgetPasswordSchema = Yup.object().shape({
  email: SHAPE.EMAIL
})

const createNewPasswordValidationSchema = Yup.object().shape({
  password: SHAPE.PASSWORD,
  confirmPassword: SHAPE.CONFIRM_PASSWORD
})

export {
  loginValidationSchema,
  signUpValidationSchema,
  forgetPasswordSchema,
  otpValidationSchema,
  createNewPasswordValidationSchema
}
