import React from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'
import {Icon, Text, TextButton, TextType} from 'src/components'
import {useAppNavigation} from 'src/routes'
import {AppRoutes} from 'src/routes/routes'

const Home = () => {
  const {t} = useTranslation()
  const navigation = useAppNavigation()

  // useEffect(() => {
  //   api.get('/posts/1').then((result) => console.log('result', result))
  // }, [])

  return (
    <View style={{flex: 1}}>
      <Text>{t('main.home.title')}</Text>
      <TextButton
        textType={TextType.body1}
        text="hello"
        onPress={() => navigation.navigate(AppRoutes.Profile)}
      />
      <Icon name="eye" />
    </View>
  )
}

export default Home
