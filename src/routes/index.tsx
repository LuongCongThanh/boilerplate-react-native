import React from 'react'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'

import {Header} from 'src/components'
import {withSafeAreaView} from 'src/hoc/common'
import {useIsAuthenticated} from 'src/hooks/authentication'
import {AUTH_SCREENS} from 'src/modules/auth/routes'
import {MAIN_SCREENS} from 'src/modules/main/routes'
import {SETTING_SCREENS} from 'src/modules/setting/routes'

import {AppRoutes, AppStackParamList} from './routes'
import {MainTabNavigator} from './mainTabNavigator'

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
  )
}
