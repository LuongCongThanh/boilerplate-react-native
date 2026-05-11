import React, {useState} from 'react'
import {Image, StyleSheet, View, ViewStyle} from 'react-native'
import {ImagePicker, Text, TextType} from 'src/components'
import {COLORS, sizeScale} from 'src/styles'

export type Props = {
  ContainerStyles?: ViewStyle
  userName: string
  userPhoneNumber?: string
}

const ProfileCard = ({ContainerStyles, userName, userPhoneNumber}: Props) => {
  const [imagePath, setImagePath] = useState<string | null>(null)

  return (
    <View style={ContainerStyles}>
      <View style={styles.imageContainer}>
        <Image
          source={
            imagePath
              ? {uri: imagePath}
              : require('src/assets/img/setting/img_ava.png')
          }
          style={styles.avaImage}
        />
        <View style={styles.pickerIcon}>
          <ImagePicker
            size={24}
            color={COLORS.white}
            onSelected={(result) => {
              setImagePath(result.path)
            }}
          />
        </View>
      </View>
      <Text
        style={styles.userName}
        textType={TextType.body2}
        color={COLORS.primary}
        textAlign="center"
        weight="700">
        {userName}
      </Text>
      <Text textType={TextType.body3} color={COLORS.gray} textAlign="center">
        {userPhoneNumber}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: sizeScale(24)
  },
  avaImage: {
    width: sizeScale(168),
    height: sizeScale(168),
    borderRadius: sizeScale(100)
  },
  pickerIcon: {
    backgroundColor: COLORS.primary,
    width: sizeScale(34),
    height: sizeScale(34),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: sizeScale(8),
    borderTopLeftRadius: sizeScale(8),
    borderBottomRightRadius: sizeScale(8),
    alignSelf: 'flex-end',
    position: 'absolute',
    right: sizeScale(110),
    bottom: sizeScale(15)
  },
  userName: {
    marginBottom: sizeScale(8)
  }
})

export default ProfileCard
