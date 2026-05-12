# Architecture Overview / Tổng Quan Kiến Trúc

## High-Level Flow / Luồng Tổng Quan

```
┌─────────────────────────────────────────────────────┐
│                     src/index.tsx                    │
│  Redux Provider → i18n → SafeAreaProvider → App.tsx  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                      App.tsx                         │
│          AppNavigator  +  ErrorPopup                 │
└─────────────────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   Not authenticated             Authenticated
   AUTH_SCREENS stack       Main stack + SETTING_SCREENS
   (SignIn, SignUp…)          MainTabNavigator (4 tabs)
```

---

## Key Layers / Các Tầng Chính

### 1. Navigation

**Files:** `src/routes/`

The navigator reads `selectIsAuthenticated` from Redux and renders either the auth stack or the main stack.  
Navigator đọc `selectIsAuthenticated` từ Redux và render auth stack hoặc main stack tương ứng.

```
routes/index.tsx
  └─ isAuthenticated ?
       YES → NativeStack: main screens + setting screens
              └─ MainTabNavigator (Home, Location, Calendar, Profile)
       NO  → NativeStack: AUTH_SCREENS
```

Each module owns its route config:

```
modules/auth/routes/routes.ts    ← AuthRoutes enum + param types
modules/auth/routes/index.tsx    ← AUTH_SCREENS array [{name, component, ...}]
```

`routes/routes.ts` merges all module enums into `AppStackParamList` — the single source of type-safe navigation params.  
`routes/routes.ts` gộp tất cả enum của module thành `AppStackParamList` — nguồn duy nhất cho navigation params có type.

---

### 2. State Management (Redux)

**Files:** `src/store/`, `src/modules/*/store/`

```
┌─────────────────────────────────────────────────┐
│                  Redux Store                     │
│  ┌─────────────┐  ┌────────────────────────┐   │
│  │  auth slice  │  │     common slice        │   │
│  │  (persisted) │  │  (language preference)  │   │
│  └─────────────┘  └────────────────────────┘   │
│                                                  │
│  Middleware: errorMiddleware                     │
│  Persist: redux-persist (AsyncStorage, auth only)│
└─────────────────────────────────────────────────┘
```

**Selectors** live in `src/store/selectors/` — always use these in components, never access `state.auth.token` directly.  
**Selector** nằm trong `src/store/selectors/` — luôn dùng selector trong component, không access `state.auth.token` trực tiếp.

```typescript
// ✅ Correct / Đúng
const isAuth = useSelector(selectIsAuthenticated)

// ❌ Incorrect / Sai
const isAuth = useSelector((s) => !!s.auth.token)
```

**Error Middleware** intercepts every rejected async thunk and automatically shows an error popup — no error handling needed in components.  
**Error Middleware** bắt mọi async thunk bị reject và tự hiển thị popup lỗi — component không cần xử lý lỗi thủ công.

```
dispatch(loginAsync(...))
  → thunk rejected
  → errorMiddleware intercepts
  → errorBus.show(normalizeError(payload))
  → ErrorPopup renders the message
```

---

### 3. Network Layer

**Files:** `src/services/network/`

```
IHttpClient (interface)
    └─ createHttpClient(config) → axios instance with:
         • Request interceptor  → adds Authorization: Bearer <token>
         • Response interceptor → on 401: calls onUnauthorized (dispatches logout)
         • API versioning       → URL-path strategy (/v1/...)

api.ts → singleton instance using API_URL from .env
```

Each module creates its own API class that calls `api` (the singleton):

```typescript
// modules/auth/services/api.ts
class Api {
  static signIn(body: IUserSignInDTO) {
    return api.post<IUserSignInDTO>(END_POINT.SIGN_IN, body)
  }
}
```

Then the Redux async thunk calls the module API:

```typescript
// modules/auth/store/slice/auth.ts
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const res = await AuthApi.signIn(credentials)
      return res.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
```

---

### 4. Error Handling

**Files:** `src/services/event/alert.ts`, `src/store/middleware/errorMiddleware.ts`, `src/components/core/ErrorPopup.tsx`

```
Async thunk rejects
  └─ errorMiddleware (Redux middleware)
       └─ normalizeError(payload) → IErrorBody {title, message}
            └─ errorBus.show(error)     ← DeviceEventEmitter.emit
                 └─ ErrorPopup.tsx listens via errorBus.subscribe
                      └─ Shows Modal to user
```

`ErrorPopup` is mounted once in `App.tsx` — it covers the entire app without any component knowing about it.  
`ErrorPopup` được mount một lần trong `App.tsx` — hiển thị lỗi toàn app mà không component nào cần biết.

To show a manual error outside of a rejected thunk, use `errorBus` directly:

```typescript
import {errorBus} from 'src/services/event/alert'
errorBus.show({title: 'Lỗi', message: 'Không thể tải dữ liệu'})
```

---

### 5. Forms

**Libraries:** `react-hook-form` + `@hookform/resolvers/zod` + `zod`

All forms follow this pattern:

```typescript
// 1. Define schema in modules/<name>/constants/validator.ts
const loginSchema = z.object({
  email: z.string().email({message: 'auth.errors.invalidEmail'}),
  password: z.string().min(6, {message: 'auth.errors.passwordTooShort'})
})
type LoginFormValues = z.infer<typeof loginSchema>

// 2. Use in screen/component
const methods = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: {email: '', password: ''}
})

// 3. Wrap fields with FormProvider
return (
  <FormProvider {...methods}>
    <InputField name="email" placeholder="Email" />
    <RoundButton onPress={() => methods.handleSubmit(onSubmit)()} />
  </FormProvider>
)
```

`InputField` / `PasswordField` / `OTPInputField` in `src/components/core/form/` read from `FormProvider` automatically — no need to pass `control` manually.  
Các `InputField` trong `src/components/core/form/` tự đọc từ `FormProvider` — không cần truyền `control` thủ công.

---

### 6. Multi-Language (i18n)

**Files:** `src/translations/`, `src/modules/*/translations/`

```
Language detection (react-native-localize)
  └─ i18next initialized with en/fr resources
       └─ Fallback: 'en'
            └─ User can change language → store.dispatch(changeLanguage('fr'))
                 └─ useAppLanguage hook syncs Redux → i18next
```

Translation keys are typed — import key paths are auto-completed in the IDE thanks to `src/types/i18next.d.ts`.  
Key dịch có type — IDE tự gợi ý key nhờ `src/types/i18next.d.ts`.

```typescript
const {t} = useTranslation()
t('auth.signIn.title') // ← autocompleted, compile-time checked
```

---

### 7. Styling System

All sizes go through `sizeScale` so the app looks consistent on different screen densities.  
Mọi kích thước đều qua `sizeScale` để app nhìn đồng nhất trên các màn hình khác nhau.

```typescript
import {COLORS, sizeScale, APP_STYLES, fontMaker} from 'src/styles'

const styles = StyleSheet.create({
  container: {
    ...APP_STYLES.flex,
    padding: sizeScale(16), // 16 dp scaled to device
    backgroundColor: COLORS.primary
  },
  title: {
    ...fontMaker({weight: 'Bold'}),
    fontSize: sizeScale(18),
    color: COLORS.white
  }
})
```

`APP_STYLES` presets: `flex`, `flexCenter`, `row`, `rowCenter`, `shadowBox`.  
`COLORS` has semantic names: `primary`, `secondary`, `white`, `black`, `error`, `success`, etc.

---

## Module Isolation Principle / Nguyên Tắc Cô Lập Module

Each module (`auth`, `main`, `setting`) is self-contained:

- ✅ A module imports from `src/components`, `src/styles`, `src/services`, `src/store/selectors`
- ❌ A module must NOT import from another module (e.g. `modules/auth` should not import from `modules/main`)

Cross-module shared state lives in `src/store/slice/common.ts`.  
State dùng chung giữa modules thì đặt trong `src/store/slice/common.ts`.
