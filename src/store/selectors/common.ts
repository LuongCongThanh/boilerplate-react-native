import {RootState} from 'src/store'

export const selectLanguage = (state: RootState) => state.common?.language
