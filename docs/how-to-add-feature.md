# How to Add a Feature / Hướng Dẫn Thêm Tính Năng Mới

This guide walks through the most common tasks a developer does on this project.  
Hướng dẫn này trình bày các tác vụ thường gặp nhất khi làm việc với project.

---

## 1. Add a New Screen / Thêm Màn Hình Mới

We'll add a `Notifications` screen to the `main` module as an example.  
Lấy ví dụ thêm màn hình `Notifications` vào module `main`.

### Step 1 — Declare the route / Khai báo route

`src/modules/main/routes/routes.ts`

```typescript
export enum MainRoutes {
  Home = 'Home',
  LocationSearching = 'LocationSearching',
  Calendar = 'Calendar',
  Notifications = 'Notifications' // ← add here
}

export type MainStackParamList = {
  [MainRoutes.Home]: undefined
  [MainRoutes.LocationSearching]: undefined
  [MainRoutes.Calendar]: undefined
  [MainRoutes.Notifications]: {unreadCount?: number} // ← add params type
}
```

### Step 2 — Register the screen / Đăng ký màn hình

`src/modules/main/routes/index.tsx`

```typescript
import Notifications from 'src/modules/main/screens/Notifications'

export const MAIN_SCREENS: StackScreenConfig[] = [
  // ...existing screens
  {name: MainRoutes.Notifications, component: Notifications}
]
```

### Step 3 — Create the screen file / Tạo file màn hình

`src/modules/main/screens/Notifications/index.tsx`

```typescript
import React from 'react'
import {View} from 'react-native'
import {Text} from 'src/components'
import {styles} from './styles'

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text type="h2">Notifications</Text>
    </View>
  )
}

export default React.memo(Notifications)
```

`src/modules/main/screens/Notifications/styles.ts`

```typescript
import {StyleSheet} from 'react-native'
import {COLORS, sizeScale} from 'src/styles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizeScale(16),
    backgroundColor: COLORS.white
  }
})
```

### Step 4 — Navigate to the screen / Điều hướng đến màn hình

From any other screen:

```typescript
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppStackParamList} from 'src/routes/routes'
import {MainRoutes} from 'src/modules/main/routes/routes'

type Nav = NativeStackNavigationProp<AppStackParamList>

const SomeScreen = () => {
  const navigation = useNavigation<Nav>()

  const goToNotifications = () => {
    navigation.navigate(MainRoutes.Notifications, {unreadCount: 5})
  }
  // ...
}
```

---

## 2. Add an API Call / Thêm API Call

### Step 1 — Add the endpoint / Thêm endpoint

`src/modules/main/constants/endPoint.ts`

```typescript
export enum END_POINT {
  NOTIFICATIONS = 'notifications' // → calls /v1/notifications
}
```

### Step 2 — Define DTO types / Định nghĩa kiểu dữ liệu

`src/modules/main/model/dto.ts`

```typescript
export interface INotification {
  id: string
  message: string
  read: boolean
  createdAt: string
}
```

### Step 3 — Add the API method / Thêm method gọi API

`src/modules/main/services/api.ts`

```typescript
import api from 'src/services/network/api'
import {END_POINT} from 'src/modules/main/constants/endPoint'
import {INotification} from 'src/modules/main/model/dto'

class MainApi {
  static getNotifications() {
    return api.get<INotification[]>(END_POINT.NOTIFICATIONS)
  }
}

export default MainApi
```

### Step 4 — Create an async thunk / Tạo async thunk

`src/modules/main/store/slice/notifications.ts`

```typescript
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import MainApi from 'src/modules/main/services/api'
import {INotification} from 'src/modules/main/model/dto'

interface NotificationsState {
  list: INotification[]
  isLoading: boolean
}

const initialState: NotificationsState = {
  list: [],
  isLoading: false
}

export const fetchNotificationsAsync = createAsyncThunk(
  'notifications/fetch',
  async (_, {rejectWithValue}) => {
    try {
      const res = await MainApi.getNotifications()
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchNotificationsAsync.rejected, (state) => {
        state.isLoading = false
        // errorMiddleware handles the error popup automatically
      })
  }
})

export default notificationsSlice.reducer
```

### Step 5 — Register reducer in store / Đăng ký reducer vào store

`src/store/index.ts`

```typescript
import notificationsReducer from 'src/modules/main/store/slice/notifications'

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  notifications: notificationsReducer // ← add here
})
```

### Step 6 — Add selectors / Thêm selector

`src/store/selectors/notifications.ts`

```typescript
import {RootState} from 'src/store'

export const selectNotifications = (state: RootState) =>
  state.notifications.list
export const selectNotificationsIsLoading = (state: RootState) =>
  state.notifications.isLoading
```

Export from `src/store/selectors/index.ts`:

```typescript
export * from './notifications'
```

### Step 7 — Use in the screen / Dùng trong màn hình

```typescript
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {AppDispatch} from 'src/store'
import {fetchNotificationsAsync} from 'src/modules/main/store/slice/notifications'
import {
  selectNotifications,
  selectNotificationsIsLoading
} from 'src/store/selectors'

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>()
  const list = useSelector(selectNotifications)
  const isLoading = useSelector(selectNotificationsIsLoading)

  useEffect(() => {
    dispatch(fetchNotificationsAsync())
  }, [dispatch])

  // render list...
}
```

---

## 3. Add a New Module / Thêm Module Mới

To add a completely new feature module (e.g. `shop`):  
Thêm module hoàn toàn mới (ví dụ `shop`):

1. Create the folder structure:

```
src/modules/shop/
├── constants/
│   ├── endPoint.ts
│   └── validator.ts
├── model/
│   └── dto.ts
├── routes/
│   ├── routes.ts
│   └── index.tsx
├── screens/
│   └── ShopHome/
│       ├── index.tsx
│       └── styles.ts
├── services/
│   └── api.ts
├── store/
│   ├── slice/
│   │   └── shop.ts
│   └── index.ts
└── translations/
    ├── en.json
    └── fr.json
```

2. Add routes to `src/routes/routes.ts` (merge enum + param list)
3. Add reducer to `src/store/index.ts`
4. Add translations to `src/translations/resources/index.ts`
5. Wire screens into `src/routes/index.tsx` or `src/routes/mainTabNavigator.tsx`

---

## 4. Add Translations / Thêm Bản Dịch

### Add a new key / Thêm key mới

`src/modules/<name>/translations/en.json`

```json
{
  "notifications": {
    "title": "Notifications",
    "empty": "No notifications yet"
  }
}
```

`src/modules/<name>/translations/fr.json`

```json
{
  "notifications": {
    "title": "Notifications",
    "empty": "Aucune notification"
  }
}
```

### Use the key in a component / Dùng key trong component

```typescript
import {useTranslation} from 'react-i18next'

const {t} = useTranslation()
t('notifications.title') // → "Notifications"
```

TypeScript will auto-complete and warn if the key doesn't exist.  
TypeScript tự gợi ý và cảnh báo nếu key không tồn tại.

---

## 5. Add a Shared Component / Thêm Component Dùng Chung

Only add to `src/components/core/` if the component will be used in **multiple modules**.  
Chỉ thêm vào `src/components/core/` nếu component được dùng ở **nhiều module**.

```typescript
// src/components/core/Badge.tsx
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from './Text'
import {COLORS, sizeScale} from 'src/styles'

interface BadgeProps {
  count: number
}

export const Badge = ({count}: BadgeProps) => (
  <View style={styles.container}>
    <Text type="caption" style={styles.text}>{count}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.error,
    borderRadius: sizeScale(10),
    paddingHorizontal: sizeScale(6),
    paddingVertical: sizeScale(2)
  },
  text: {color: COLORS.white}
})
```

Then export from `src/components/index.ts`:

```typescript
export {Badge} from './core/Badge'
```

---

## 6. Write a Test / Viết Test

### Unit test for a component / Test component

```typescript
// src/modules/main/screens/Notifications/__tests__/Notifications.test.tsx
import React from 'react'
import {renderWithStore} from 'src/utils/test'
import Notifications from '../index'

describe('Notifications screen', () => {
  it('renders without crashing', () => {
    const {getByText} = renderWithStore(<Notifications />, {
      notifications: {list: [], isLoading: false}
    })
    expect(getByText('Notifications')).toBeTruthy()
  })
})
```

### Unit test for a selector / Test selector

```typescript
import {selectNotifications} from 'src/store/selectors'

describe('selectNotifications', () => {
  it('returns list from state', () => {
    const state = {
      notifications: {
        list: [{id: '1', message: 'Hi', read: false, createdAt: ''}],
        isLoading: false
      }
    } as any
    expect(selectNotifications(state)).toHaveLength(1)
  })
})
```

Run tests with `npm test`.
