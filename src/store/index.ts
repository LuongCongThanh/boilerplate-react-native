import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {authReducer} from 'src/modules/auth/store'
import commonReducer from './slice/common'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
}

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer
})

const middlewares: Middleware[] = []

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...middlewares)
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
