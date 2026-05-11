import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface authState {
  token?: string
}

const initialState: authState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<authState>>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const {login} = authSlice.actions
export default authSlice.reducer
