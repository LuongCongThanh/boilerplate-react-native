import {StackScreenConfig, TabScreenConfig} from 'src/routes/routes'
import {MainRoutes} from './routes'

import Home from 'src/modules/main/screens/Home'
import LocationSearching from 'src/modules/main/screens/LocationSearching'
import Calendar from 'src/modules/main/screens/Calendar'

export const MAIN_SCREENS: StackScreenConfig[] = [
  // {
  //   name: MainRoutes.Home,
  //   component: Home
  // }
]

export const HOME_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.Home,
  component: Home
}
export const LOCATION_SEARCHING_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.LocationSearching,
  component: LocationSearching
}
export const CALENDAR_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.Calendar,
  component: Calendar
}
