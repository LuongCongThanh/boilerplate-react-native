import Session from 'src/services/network/api'

import {IUserSignInDTO} from '../model/dto'
import {END_POINT} from '../constants/endPoint'

export default class Api {
  static signIn(body: IUserSignInDTO) {
    return Session.post<IUserSignInDTO>(END_POINT.SIGN_IN, body)
  }
}
