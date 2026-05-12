import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {selectLanguage} from 'src/store/selectors'
import i18n from 'src/translations'

export const useAppLanguage = () => {
  const language = useSelector(selectLanguage)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
}
