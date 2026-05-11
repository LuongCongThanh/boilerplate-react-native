import {StyleSheet} from 'react-native'

import COLORS from './color'

const APP_STYLES = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  shadowBox: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 5
  }
})

export default APP_STYLES
