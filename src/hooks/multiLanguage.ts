import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from 'src/store'
import i18n from 'src/translations'

export const useAppLanguage = () => {
  const language = useSelector((state: RootState) => state.common?.language)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
}
