import {SettingRoutes} from './routes'

import Profile from '../screens/profile'
import {StackScreenConfig, TabScreenConfig} from 'src/routes/routes'

import ProfileActive from 'src/assets/img/common/svg/profile_active.svg'
import ProfileInactive from 'src/assets/img/common/svg/profile_inactive.svg'

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
  component: Profile,
  icon: {active: ProfileActive, inactive: ProfileInactive}
}
