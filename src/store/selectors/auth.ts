import {RootState} from 'src/store'

export const selectAuthToken = (state: RootState) => state.auth?.token
export const selectIsAuthenticated = (state: RootState) => !!state.auth?.token
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading
