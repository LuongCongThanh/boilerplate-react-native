import {StyleSheet} from 'react-native'
import {COLORS, sizeScale} from 'src/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: sizeScale(24)
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: sizeScale(32)
  },
  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizeScale(24)
  }
})

export default styles
