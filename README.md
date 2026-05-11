<h1>Guideline</h1>

<h3>Lint, format, type declaration ...</h3>

- **Dependencies:**
  
  `yarn add -D @react-native-community/eslint-config eslint-config-airbnb-typescript eslint-plugin-import`

- **Flow config files:** `.eslintrc` `tsconfig` `.prettierrc`

<h3>Utils</h3>

- **Dependencies**: 
  - **Lodash, dayjs**

  `yarn add lodash @types/lodash dayjs`

- **Libraries docs:**
  - [lodash](https://lodash.com/docs)
  - [dayjs](https://day.js.org/docs/en/installation/installation)

<h3>Env</h3>

- **Dependencies:**
  
  `yarn add -D react-native-dotenv`

- **Libraries docs:**
  - [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)

- **Flow config files:** `.eslintrc` `tsconfig` `.prettierrc`

<h3>Network</h3>

- **Dependencies:**

  `yarn add axios axios-api-versioning`

- **Libraries docs:**
  - [axios](https://axios-http.com/docs/intro)
  - [axios api versioning](https://weffe.github.io/axios-api-versioning/#/?id=welcome)

- **Concept:** 
  - **Folder path**: `services/network` 

  - **Implementation:** 
    - Base class `http.ts`.
    - Other instances extend base class and implement base on each service requirement. 
    - Example `api.ts` will add ***baseUrl*** and ***token*** via ***addRequestInterceptor*** method.    

<h3>Navigation</h3>

- **Dependencies**:
  - **Core**

  `yarn add @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context`

  - **Stack navigator**

  `yarn add @react-navigation/native-stack @react-native-masked-view/masked-view react-native-gesture-handler`

- **Libraries docs:**
  - [react navigation](https://reactnavigation.org/docs/getting-started)

- **Concept:** 
  - **Folder path:** `routes` and `modules/.../routes` 

  - **Implementation:** 
    - `modules/.../routes/routes.ts` contains routes list and routes params list for each modules.
    - `routes.ts` imports declared enums from `modules/.../routes/routes.ts` and export to use in `routes/index.ts` and others files.
    - `modules/.../routes/index.ts` contains screen config for each modules. 
    - `routes/index.tsx` imports `modules/.../routes/index.ts` and implement ***NavigationContainer*** base on app requirement. 



<h3>Redux</h3>

- **Dependencies:**
  - **Core**

  `yarn add react-redux @reduxjs/toolkit redux-persist`

  - **Debugger**

  `yarn add react-native-flipper redux-flipper`

- **Libraries docs:**
  - [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started)
  - [redux-persist](https://www.npmjs.com/package/redux-persist)

- **Concept**
  - **Folder path** `store` and `modules/.../store`

  - **Implementation:**

    - `modules/.../slice/*.ts` contains actions and reducers are declared for each modules.
    - `modules/.../index.ts` exports reducer for each modules
    - `index.ts` contains configuration for root store with ***redux-persist***. This files import reducers from other modules and combine to ***rootReducer*** 

<h3>Multi Language</h3>

- **Dependencies:**

  `yarn add react-i18next i18next react-native-localize`

- **Libraries docs:**
  - [i18next](https://www.i18next.com/)
  - [react-i18next](https://react.i18next.com/)
  - [react-native-localize](https://www.npmjs.com/package/react-native-localize)

- **Concept:**
  
  - **Folder path:** `translations` and `modules/.../translations`

  - **Implementation:**

      - `modules/.../translations` contains wording keys for each languages like ***en.json***, ***fr.json***.
      - `translations/resources/index.ts` imports wording files from `modules/.../translations` and export to use in `translations/index.ts`
      - `translations/index.ts` contains configuration for ***i18n*** and export ***i18n*** module to use in app.
      - The hook `multiLanguage.ts` is used to load the current language has been set by user.
      - `types/i18next.d.ts` is declared to setup autocompleted wording keys.
# boilerplate-react-native
