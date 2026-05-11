import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {defaultLanguage} from 'src/translations'

interface commonState {
  language?: string
}

const initialState: commonState = {
  language: defaultLanguage
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    }
  }
})

export const {changeLanguage} = commonSlice.actions
export default commonSlice.reducer
