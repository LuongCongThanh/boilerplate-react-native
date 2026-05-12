import {StackScreenConfig, TabScreenConfig} from 'src/routes/routes'
import {MainRoutes} from './routes'

import Home from 'src/modules/main/screens/Home'
import LocationSearching from 'src/modules/main/screens/LocationSearching'
import Calendar from 'src/modules/main/screens/Calendar'

import HomeActive from 'src/assets/img/common/svg/home_active.svg'
import HomeInactive from 'src/assets/img/common/svg/home_inactive.svg'
import LocationActive from 'src/assets/img/common/svg/location_active.svg'
import LocationInactive from 'src/assets/img/common/svg/location_inactive.svg'
import CalendarActive from 'src/assets/img/common/svg/calendar_active.svg'
import CalendarInactive from 'src/assets/img/common/svg/calendar_inactive.svg'

export const MAIN_SCREENS: StackScreenConfig[] = [
  // {
  //   name: MainRoutes.Home,
  //   component: Home
  // }
]

export const HOME_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.Home,
  component: Home,
  icon: {active: HomeActive, inactive: HomeInactive}
}

export const LOCATION_SEARCHING_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.LocationSearching,
  component: LocationSearching,
  icon: {active: LocationActive, inactive: LocationInactive}
}

export const CALENDAR_TAB_SCREEN: TabScreenConfig = {
  name: MainRoutes.Calendar,
  component: Calendar,
  icon: {active: CalendarActive, inactive: CalendarInactive}
}
