import React, {useMemo} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {withSafeAreaView} from 'src/hoc/common'
import {COLORS, sizeScale} from 'src/styles'

import {
  HOME_TAB_SCREEN,
  CALENDAR_TAB_SCREEN,
  LOCATION_SEARCHING_TAB_SCREEN
} from 'src/modules/main/routes'
import {PROFILE_TAB_SCREEN} from 'src/modules/setting/routes'
import {TabScreenConfig} from './routes'

const Tab = createBottomTabNavigator()

const TAB_SCREENS: TabScreenConfig[] = [
  HOME_TAB_SCREEN,
  LOCATION_SEARCHING_TAB_SCREEN,
  CALENDAR_TAB_SCREEN,
  PROFILE_TAB_SCREEN
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
      sceneContainerStyle={styles.tabScreen}
    >
      {TAB_SCREENS.map(({name, icon, options, ...rest}) => {
        const tabBarIcon = icon
          ? ({focused}: {focused: boolean}) => {
              const SvgIcon = focused ? icon.active : icon.inactive
              return <SvgIcon />
            }
          : undefined

        return (
          <Tab.Screen
            key={name}
            name={name}
            options={{...options, tabBarIcon}}
            {...rest}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabScreen: {
    backgroundColor: COLORS.white
  }
})
