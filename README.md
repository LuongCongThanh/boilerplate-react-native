# boilerplate-react-native

Production-ready React Native boilerplate with typed navigation, Redux Toolkit, form validation, multi-language support, and centralized error handling.

## Tech Stack

| Layer      | Library                                         |
| ---------- | ----------------------------------------------- |
| UI         | React Native 0.74 · React 18                    |
| Navigation | React Navigation 6 (native-stack + bottom-tabs) |
| State      | Redux Toolkit 2 · redux-persist                 |
| Forms      | react-hook-form + Zod                           |
| Network    | Axios + axios-api-versioning                    |
| i18n       | i18next · react-i18next · react-native-localize |
| Linting    | ESLint (Airbnb + TypeScript) · Prettier · Husky |
| Testing    | Jest · @testing-library/react-native            |

## Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. iOS — install pods (macOS only)
cd ios && pod install && cd ..

# 3. Copy environment file
cp .env.example .env   # then fill in API_URL

# 4. Start Metro
npm start

# 5. Run on device/emulator
npm run android
npm run ios
```

> First-time setup? See [Getting Started](docs/getting-started.md) for environment prerequisites (Node, JDK, Android Studio, Xcode).

## Documentation

| Doc                                                | Nội dung                                                |
| -------------------------------------------------- | ------------------------------------------------------- |
| [Getting Started](docs/getting-started.md)         | Environment setup, run app, troubleshooting             |
| [Folder Structure](docs/folder-structure.md)       | What lives where and why                                |
| [Architecture](docs/architecture.md)               | Redux, navigation, error handling, i18n, styling        |
| [How to Add a Feature](docs/how-to-add-feature.md) | Step-by-step: screen · API call · module · translations |
| [Conventions](docs/conventions.md)                 | Naming rules, import order, TypeScript rules            |

## Scripts

```bash
npm start          # Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS (iPhone 13 simulator)
npm run lint       # ESLint check
npm test           # Jest with coverage
```
