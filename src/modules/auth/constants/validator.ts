import {z} from 'zod'

const EMAIL = z
  .string()
  .min(1, 'auth.errors.email.required')
  .email('auth.errors.email.invalid')
  .regex(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
    'auth.errors.email.invalid'
  )

const PASSWORD_REQUIRED = z.string().min(1, 'auth.errors.password.required')

const USERNAME = z.string().min(1, 'auth.errors.username.required')

const PASSWORD = z
  .string()
  .min(8, 'auth.errors.password.minimumCharacters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'auth.errors.password.hardPassword'
  )

const OTP_CODE = z.string().length(5, 'auth.errors.otp.length')

const loginValidationSchema = z.object({
  email: EMAIL,
  password: PASSWORD_REQUIRED
})

const signUpValidationSchema = z
  .object({
    username: USERNAME,
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: z.string().min(1, 'auth.errors.password.requiredConfirmPassword')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'auth.errors.password.notMatch',
    path: ['confirmPassword']
  })

const otpValidationSchema = z.object({
  code: OTP_CODE
})

const forgetPasswordSchema = z.object({
  email: EMAIL
})

const createNewPasswordValidationSchema = z
  .object({
    password: PASSWORD,
    confirmPassword: z.string().min(1, 'auth.errors.password.requiredConfirmPassword')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'auth.errors.password.notMatch',
    path: ['confirmPassword']
  })

export type LoginFormValues = z.infer<typeof loginValidationSchema>
export type SignUpFormValues = z.infer<typeof signUpValidationSchema>
export type OTPFormValues = z.infer<typeof otpValidationSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgetPasswordSchema>
export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordValidationSchema>

export {
  loginValidationSchema,
  signUpValidationSchema,
  forgetPasswordSchema,
  otpValidationSchema,
  createNewPasswordValidationSchema
}
