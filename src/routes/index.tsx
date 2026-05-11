import {
  NavigationContainer,
  NavigationProp,
  useNavigation
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Header } from 'src/components'
import { withSafeAreaView } from 'src/hoc/common'
import { useIsAuthenticated } from 'src/hooks/authentication'
import { MAIN_SCREENS } from 'src/modules/main/routes'
import { SETTING_SCREENS } from 'src/modules/setting/routes'

import { AUTH_SCREENS } from 'src/modules/auth/routes'
import { MainTabNavigator } from './mainTabNavigator'
import { AppRoutes, AppStackParamList } from './routes'

const AppStack = createNativeStackNavigator<AppStackParamList>()

export const AppStackType = typeof AppStack
type AppNavigationProp = NavigationProp<AppStackParamList>

export const useAppNavigation = () => useNavigation<AppNavigationProp>()

const safeAreaAuthScreens = AUTH_SCREENS.map((item) => ({
  ...item,
  component: withSafeAreaView(item.component)
}))

const safeAreaAppScreens = [...MAIN_SCREENS, ...SETTING_SCREENS].map(
  (item) => ({
    ...item,
    component: withSafeAreaView(item.component)
  })
)

export const AppNavigator = () => {
  const isAuthenticated = useIsAuthenticated()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            header: Header,
            fullScreenGestureEnabled: true
          }}>
          {!isAuthenticated ? (
            <AppStack.Group>
              {safeAreaAuthScreens.map(({name, ...rest}) => (
                <AppStack.Screen key={name} name={name} {...rest} />
              ))}
            </AppStack.Group>
          ) : (
            <AppStack.Group>
              <AppStack.Screen
                name={AppRoutes.Main}
                component={MainTabNavigator}
                options={{headerShown: false}}
              />
              {safeAreaAppScreens.map(({name, ...rest}) => (
                <AppStack.Screen key={name} name={name} {...rest} />
              ))}
            </AppStack.Group>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
