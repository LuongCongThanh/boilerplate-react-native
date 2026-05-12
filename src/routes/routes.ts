/* eslint-disable @typescript-eslint/indent */
import {NativeStackNavigationOptions} from '@react-navigation/native-stack'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'

import {AuthRoutes, AuthStackParamList} from 'src/modules/auth/routes/routes'
import {MainRoutes, MainStackParamList} from 'src/modules/main/routes/routes'
import {
  SettingRoutes,
  SettingStackParamList
} from 'src/modules/setting/routes/routes'

enum MainTabRoutes {
  Main = 'Main'
}

type MainTabParamList = {
  [MainTabRoutes.Main]: undefined
}

export const AppRoutes = {
  ...AuthRoutes,
  ...MainRoutes,
  ...SettingRoutes,
  ...MainTabRoutes
}

export type AppStackParamList = AuthStackParamList &
  MainStackParamList &
  SettingStackParamList &
  MainTabParamList

export type StackScreenConfig = {
  name: keyof AppStackParamList
  component: React.ComponentType<any>
  options?: NativeStackNavigationOptions
}

export type TabIcon = {
  active: React.ComponentType
  inactive: React.ComponentType
}

export type TabScreenConfig = {
  name: keyof AppStackParamList
  component: React.ComponentType<any>
  options?: BottomTabNavigationOptions
  icon?: TabIcon
}
