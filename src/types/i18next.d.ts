import 'i18next'

import * as resources from '../translations/resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof resources.en
    }
  }
}
