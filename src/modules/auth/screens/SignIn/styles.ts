import {StyleSheet} from 'react-native'
import {COLORS, sizeScale} from 'src/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: sizeScale(24),
    justifyContent: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: sizeScale(32)
  },
  forgotPassword: {
    alignSelf: 'center',
    marginVertical: sizeScale(24)
  },
  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default styles
