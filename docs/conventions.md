# Code Conventions / Quy Ước Code

Các quy ước này được enforce tự động qua ESLint. Vi phạm sẽ bị chặn ở pre-commit hook.  
These conventions are enforced automatically via ESLint. Violations are blocked at the pre-commit hook.

---

## 1. File Naming / Đặt Tên File

| Loại file         | Convention               | Ví dụ                                   |
| ----------------- | ------------------------ | --------------------------------------- |
| React component   | PascalCase               | `LoginForm.tsx`, `RoundButton.tsx`      |
| Hook              | camelCase                | `authentication.ts`, `multiLanguage.ts` |
| Utility / helper  | camelCase                | `errorHandler.ts`, `endPoint.ts`        |
| Style             | camelCase                | `styles.ts`                             |
| Constant / config | camelCase                | `validator.ts`, `device.ts`             |
| Type declaration  | camelCase                | `declarations.d.ts`                     |
| Test file         | same as target + `.test` | `LoginForm.test.tsx`                    |

**Rule:** Nếu file export một React component là export chính → PascalCase. Mọi trường hợp còn lại → camelCase.

---

## 2. Component Export / Export Component

Luôn dùng **named export**. Không dùng default export cho component.  
Always use **named export**. Never use default export for components.

```typescript
// ✅ Correct
export const LoginForm = () => {
  return <View />
}

// ❌ Incorrect
export default function LoginForm() { ... }
export default LoginForm
```

`React.memo` chỉ dùng khi component nhận nhiều props VÀ bị re-render thường xuyên từ parent (ví dụ: item trong FlatList). Screen-level component không cần memo.

```typescript
// ✅ Dùng memo khi cần
export const NotificationItem = React.memo(({item}: NotificationItemProps) => {
  return <View />
})

// ✅ Screen không cần memo
export const HomeScreen = () => {
  return <View />
}
```

---

## 3. Props Interface / Interface cho Props

Đặt tên `<ComponentName>Props`. Luôn dùng `interface`, không dùng `type` cho props.  
Name it `<ComponentName>Props`. Always use `interface`, not `type` for props.

```typescript
// ✅ Correct
interface BadgeProps {
  count: number
  color?: string
}

export const Badge = ({count, color}: BadgeProps) => { ... }

// ❌ Incorrect
type Props = { count: number }
interface IBadgeProps { count: number }
```

**Phân biệt:**

- `<ComponentName>Props` — props của React component
- `I<Name>` — interface cho service/domain (ví dụ `IHttpClient`, `IErrorBody`)

---

## 4. Import Order / Thứ Tự Import

3 nhóm, cách nhau bằng blank line:

```typescript
// Nhóm 1: thư viện ngoài (node_modules)
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'

// Nhóm 2: src/ internal
import {RoundButton} from 'src/components'
import {loginAsync} from 'src/modules/auth/store/slice/auth'
import {COLORS, sizeScale} from 'src/styles'

// Nhóm 3: relative
import {styles} from './styles'
import {LoginFormHeader} from './components/LoginFormHeader'
```

Rule này được enforce tự động bởi `import/order` trong ESLint.

---

## 5. Cross-Module Imports / Import Chéo Giữa Modules

Module không được import từ module khác. ESLint sẽ báo lỗi.  
Modules must not import from each other. ESLint will error.

```typescript
// ❌ Error — src/modules/main không được import từ src/modules/auth
import {loginAsync} from 'src/modules/auth/store/slice/auth'

// ✅ Shared code đặt ở src/store/, src/components/, src/services/
import {selectIsAuthenticated} from 'src/store/selectors'
```

**Nếu cần share code giữa modules:** đặt vào tầng phù hợp:

- UI component → `src/components/core/`
- State / selector → `src/store/`
- API / network → `src/services/`
- Kiểu dữ liệu dùng chung → `src/model/`

---

## 6. TypeScript `any`

Cấm dùng `any`. ESLint sẽ báo lỗi.  
`any` is forbidden. ESLint will error.

```typescript
// ❌ Error
const handler = (data: any) => { ... }

// ✅ Dùng unknown + type guard
const handler = (data: unknown) => {
  if (typeof data === 'string') { ... }
}

// ✅ Dùng generic
const handler = <T>(data: T) => { ... }
```

**Trường hợp ngoại lệ bắt buộc** (thư viện incompatibility): dùng `eslint-disable-next-line` với comment giải thích.

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockStore = configureMockStore([thunk as any]) // redux-mock-store incompatible with redux 5 AnyAction
```

---

## 7. Module Structure / Cấu Trúc Module

Mỗi module phải tuân theo cấu trúc sau:

```
modules/<name>/
├── constants/
│   ├── endPoint.ts      # API endpoints (enum)
│   └── validator.ts     # Zod schemas
├── model/
│   └── dto.ts           # Request/response interfaces
├── routes/
│   ├── routes.ts        # Route enum + param types
│   └── index.tsx        # Screen config array
├── screens/
│   └── <ScreenName>/
│       ├── index.tsx    # Screen component (named export)
│       ├── styles.ts    # StyleSheet
│       └── components/  # Private components (chỉ dùng trong screen này)
├── services/
│   └── api.ts           # API methods
├── store/
│   ├── slice/<name>.ts  # Redux slice
│   └── index.ts         # Re-export reducer
└── translations/
    ├── en.json
    └── fr.json
```

---

## 8. Selector Rule / Quy Tắc Selector

Luôn dùng selector từ `src/store/selectors/` khi access Redux state trong component.  
Always use selectors from `src/store/selectors/` when accessing Redux state in components.

```typescript
// ✅ Correct
const isAuth = useSelector(selectIsAuthenticated)

// ❌ Incorrect — không access state trực tiếp
const isAuth = useSelector((s) => !!s.auth.token)
```

Mỗi khi thêm state mới vào store → thêm selector tương ứng vào `src/store/selectors/`.
