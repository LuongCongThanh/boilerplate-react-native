import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import AuthApi from 'src/modules/auth/services/api'
import {IUserSignInDTO} from 'src/modules/auth/model/dto'

interface AuthState {
  token?: string
  isLoading: boolean
}

const initialState: AuthState = {
  isLoading: false
}

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (body: IUserSignInDTO, {rejectWithValue}) => {
    try {
      const response = await AuthApi.signIn(body)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = undefined
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = (action.payload as {token?: string})?.token
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
