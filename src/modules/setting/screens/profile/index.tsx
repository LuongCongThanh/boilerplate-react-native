import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, View} from 'react-native'
import api from 'src/services/network/api'
import {COLORS, sizeScale} from 'src/styles'
import ProfileCard from './components/ProfileCard'
import SettingItem from './components/SettingItem'

const Profile = () => {
  const {t} = useTranslation()
  console.log('hello')
  useEffect(() => {
    api.get('/posts/1').then((result) => console.log('result', result))
  }, [])
  return (
    <View style={styles.container}>
      <ProfileCard
        ContainerStyles={styles.profileCardContainer}
        userName="Daniel Martinez"
        userPhoneNumber="+123 856479683"
      />
      <SettingItem
        name="account-edit-outline"
        title={t('setting.profile.editProfile')}
      />
      <View style={styles.line} />
      <SettingItem
        name="cards-heart-outline"
        title={t('setting.profile.favorite')}
      />
      <View style={styles.line} />
      <SettingItem
        name="bell-outline"
        title={t('setting.profile.notifications')}
      />
      <View style={styles.line} />
      <SettingItem name="cog-outline" title={t('setting.profile.settings')} />
      <View style={styles.line} />
      <SettingItem
        name="comment-question-outline"
        title={t('setting.profile.helpAndSupport')}
      />
      <View style={styles.line} />
      <SettingItem
        name="shield-key-outline"
        title={t('setting.profile.termsAndConditions')}
      />
      <View style={styles.line} />
      <SettingItem name="logout-variant" title={t('setting.profile.logOut')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileCardContainer: {
    marginBottom: sizeScale(24)
  },
  line: {
    height: sizeScale(2),
    marginHorizontal: sizeScale(24),
    backgroundColor: COLORS.gray200,
    marginVertical: sizeScale(12)
  }
})

export default Profile
