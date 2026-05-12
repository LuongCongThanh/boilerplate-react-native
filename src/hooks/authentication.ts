import {useSelector} from 'react-redux'
import {selectIsAuthenticated} from 'src/store/selectors'

export const useIsAuthenticated = () => useSelector(selectIsAuthenticated)
