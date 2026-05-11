import React, {useMemo} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {withSafeAreaView} from 'src/hoc/common'
import {COLORS, sizeScale} from 'src/styles'

import HomeActive from 'src/assets/img/common/svg/home_active.svg'
import HomeInactive from 'src/assets/img/common/svg/home_inactive.svg'
import ProfileActive from 'src/assets/img/common/svg/profile_active.svg'
import ProfileInactive from 'src/assets/img/common/svg/profile_inactive.svg'
import LocationActive from 'src/assets/img/common/svg/location_active.svg'
import LocationInactive from 'src/assets/img/common/svg/location_inactive.svg'
import CalendarActive from 'src/assets/img/common/svg/calendar_active.svg'
import CalendarInactive from 'src/assets/img/common/svg/calendar_inactive.svg'
import {
  HOME_TAB_SCREEN,
  CALENDAR_TAB_SCREEN,
  LOCATION_SEARCHING_TAB_SCREEN
} from 'src/modules/main/routes'
import {PROFILE_TAB_SCREEN} from 'src/modules/setting/routes'
import {TabScreenConfig} from './routes'

const Tab = createBottomTabNavigator()

const TAB_SCREENS: TabScreenConfig[] = [
  {
    ...HOME_TAB_SCREEN,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <HomeActive /> : <HomeInactive />
    }
  },
  {
    ...LOCATION_SEARCHING_TAB_SCREEN,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <LocationActive /> : <LocationInactive />
    }
  },
  {
    ...CALENDAR_TAB_SCREEN,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <CalendarActive /> : <CalendarInactive />
    }
  },
  {
    ...PROFILE_TAB_SCREEN,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) =>
        focused ? <ProfileActive /> : <ProfileInactive />
    }
  }
].map((item) => ({
  ...item,
  component: withSafeAreaView(item.component)
}))

const config = {
  headerShown: false,
  tabBarShowLabel: false
}

export const MainTabNavigator = () => {
  const insets = useSafeAreaInsets()

  const tabBarConfig = useMemo(() => {
    return {
      ...config,
      tabBarStyle: {
        height: sizeScale(60) + insets.bottom
      }
    }
  }, [insets])

  return (
    <Tab.Navigator
      screenOptions={tabBarConfig}
      sceneContainerStyle={styles.tabScreen}>
      {TAB_SCREENS.map(({name, ...rest}) => {
        return <Tab.Screen key={name} name={name} {...rest} />
      })}
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  tabScreen: {
    backgroundColor: COLORS.white
  }
})
