# Folder Structure / Cấu Trúc Thư Mục

## Overview / Tổng Quan

```
boilerplate-react-native/
├── android/                 # Android native project
├── ios/                     # iOS native project
├── src/                     # All application source code ← work here
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hoc/
│   ├── hooks/
│   ├── model/
│   ├── modules/             # Feature modules (main work area)
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── translations/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── docs/                    # Documentation (this folder)
├── .env                     # Environment variables (not committed)
├── .eslintrc.js
├── .prettierrc.js
├── babel.config.js
├── jest.config.js
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## `src/` in Detail / Chi Tiết `src/`

### `assets/`

Static files bundled with the app.  
File tĩnh đi kèm với app.

```
assets/
├── fonts/        # Custom font files (.ttf)
└── img/
    ├── auth/svg/     # Auth-screen illustrations
    ├── common/svg/   # Shared icons/images
    └── setting/      # Settings-screen images
```

SVG files are imported as React components thanks to the Metro SVG transformer configured in `metro.config.js`.  
File SVG được import như React component nhờ cấu hình `metro.config.js`.

---

### `components/`

Shared, reusable UI components that are not tied to any single module.  
Component UI dùng chung, không thuộc module cụ thể nào.

```
components/
├── core/
│   ├── Text.tsx           # Typed text with 11 presets (h1–h4, body1–3, caption…)
│   ├── Button.tsx         # Base pressable wrapper
│   ├── Buttons.tsx        # Presets: TextButton, RoundButton, SocialLoginButton
│   ├── Icon.tsx           # Vector icon wrapper (MaterialCommunityIcons)
│   ├── IconButton.tsx     # Icon + pressable combo
│   ├── Header.tsx         # Navigation bar header
│   ├── Modal.tsx          # Modal overlay wrapper
│   ├── ErrorPopup.tsx     # Global error toast — subscribes to errorBus
│   ├── AppLogo.tsx        # App logo component
│   ├── OTPInput.tsx       # Standalone OTP input
│   ├── ImagePicker/       # Photo/camera picker (see ImagePicker/README.md)
│   └── form/
│       ├── InputField.tsx     # Text input wired to React Hook Form + Zod
│       ├── PasswordField.tsx  # Password input with show/hide toggle
│       └── OTPInputField.tsx  # OTP input wired to React Hook Form + Zod
└── index.ts               # Barrel export — import everything from 'src/components'
```

**Rule / Quy tắc:** A component belongs here only if it is used across ≥ 2 modules. If it only exists inside one module, keep it in `modules/<name>/screens/<Screen>/components/`.  
Component chỉ đưa vào đây nếu dùng ở ≥ 2 module. Dùng riêng cho 1 module thì giữ trong `modules/<name>/screens/<Screen>/components/`.

---

### `modules/`

Each feature lives in its own self-contained folder.  
Mỗi tính năng nằm trong folder riêng, khép kín.

```
modules/
├── auth/       # Login, registration, password reset
├── main/       # Home, Location, Calendar tabs
└── setting/    # Profile / settings tab
```

Every module follows the same internal layout:

```
modules/<name>/
├── constants/
│   ├── endPoint.ts     # API endpoint strings for this module
│   └── validator.ts    # Zod validation schemas
├── model/
│   └── dto.ts          # TypeScript interfaces for API request/response
├── routes/
│   ├── routes.ts       # Route enum + navigation param types
│   └── index.tsx       # Screen config array used by the navigator
├── screens/
│   └── <ScreenName>/
│       ├── index.tsx        # Main screen component
│       ├── styles.ts        # StyleSheet for this screen
│       └── components/      # Private components used only in this screen
├── services/
│   └── api.ts          # API methods for this module (uses IHttpClient)
├── store/
│   ├── slice/
│   │   └── <name>.ts   # Redux Toolkit slice (state + async thunks)
│   └── index.ts        # Re-exports reducer
└── translations/
    ├── en.json         # English strings
    └── fr.json         # French strings (add other locales here)
```

---

### `routes/`

App-level navigation wiring.  
Cấu hình navigation toàn app.

```
routes/
├── routes.ts           # Merges all module route enums into AppStackParamList
├── index.tsx           # Root navigator (auth stack vs main stack)
└── mainTabNavigator.tsx # Bottom tab bar (4 tabs)
```

---

### `services/`

Infrastructure — networking and event bus.  
Hạ tầng — mạng và event bus.

```
services/
├── network/
│   ├── http.ts          # IHttpClient interface + createHttpClient factory
│   ├── api.ts           # Singleton HTTP client instance (uses .env API_URL)
│   └── errorHandler.ts  # normalizeError: converts raw errors → IErrorBody
└── event/
    └── alert.ts         # createErrorBus: DeviceEventEmitter pub/sub for errors
```

---

### `store/`

Global Redux state.  
Redux state toàn cục.

```
store/
├── index.ts             # Store setup: combinedReducer, redux-persist, middleware
├── slice/
│   └── common.ts        # App-wide state (current language)
├── middleware/
│   └── errorMiddleware.ts  # Intercepts rejected thunks → errorBus.show()
└── selectors/
    ├── index.ts         # Barrel export
    ├── auth.ts          # selectAuthToken, selectIsAuthenticated, selectAuthIsLoading
    └── common.ts        # selectLanguage
```

---

### `styles/`

Design tokens and helper functions.  
Design token và hàm tiện ích.

```
styles/
├── color.ts        # COLORS object — 35+ named colors
├── scale.ts        # sizeScale(px), sizeFont(px) — responsive sizing
├── fontMaker.ts    # fontMaker({weight, type}) — font family mapping
├── styles.ts       # APP_STYLES — flex, shadow presets
└── index.ts        # Barrel export
```

**Usage / Cách dùng:**

```typescript
import {COLORS, sizeScale, APP_STYLES} from 'src/styles'

const styles = StyleSheet.create({
  container: {
    ...APP_STYLES.flex,
    padding: sizeScale(16),
    backgroundColor: COLORS.white
  }
})
```

---

### `translations/`

i18n root configuration.  
Cấu hình i18n gốc.

```
translations/
├── index.ts            # i18next init (language detection, fallback = 'en')
└── resources/
    ├── index.ts        # Imports and merges all module translation files
    └── common/
        ├── en.json     # Shared keys (error messages, etc.)
        └── fr.json
```

Module translations live inside each module's `translations/` folder and are imported here.  
Translation của từng module nằm trong folder của module đó, được import vào đây.

---

### `types/`

Global TypeScript declarations.  
Khai báo TypeScript toàn cục.

```
types/
├── declarations.d.ts   # Module declarations: *.svg, *.png, react-native-actionsheet
├── env.d.ts            # @env module type (API_URL, add new vars here)
└── i18next.d.ts        # Augments i18next for translation key autocomplete
```

---

### `hooks/`

Custom hooks shared across modules.  
Hook dùng chung cho các module.

```
hooks/
├── authentication.ts   # useIsAuthenticated() — reads auth selector
└── multiLanguage.ts    # useAppLanguage() — syncs Redux language → i18next
```

---

### `hoc/`

Higher-order components for cross-cutting UI concerns.  
Higher-order component cho các vấn đề UI xuyên suốt.

```
hoc/
└── common.tsx   # withSafeAreaView(Component) — wraps screen with SafeAreaView
```

---

### `constants/`

App-level constants (not module-specific).  
Hằng số cấp app (không thuộc module cụ thể).

```
constants/
├── events.ts    # AppEvent enum (e.g. AppEvent.Error)
└── device.ts    # Device utility constants
```

---

### `utils/`

Utility helpers.

```
utils/
└── test/
    └── index.tsx   # renderWithStore, customRender — testing helpers
```
