import {SettingRoutes} from './routes'

import Profile from '../screens/profile'
import {StackScreenConfig, TabScreenConfig} from 'src/routes/routes'

export const SETTING_SCREENS: StackScreenConfig[] = [
  // {
  //   name: SettingRoutes.Profile,
  //   component: Profile,
  //   options: {
  //     headerShown: false
  //   }
  // }
]

export const PROFILE_TAB_SCREEN: TabScreenConfig = {
  name: SettingRoutes.Profile,
  component: Profile
}
