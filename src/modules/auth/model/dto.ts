export interface IUserSignInDTO {
  username: string
  password: string
}

export interface IUserSignUpDTO {
  username: string
  email: string
  password: string
  confirmPassword: string
}
