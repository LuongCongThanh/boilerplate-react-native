# Getting Started / Bắt Đầu

## Prerequisites / Yêu Cầu Môi Trường

Before starting, make sure your machine has the following installed.  
Trước khi bắt đầu, đảm bảo máy bạn đã cài đủ các công cụ sau.

| Tool                   | Version               | Download                             |
| ---------------------- | --------------------- | ------------------------------------ |
| Node.js                | 18 LTS or newer       | https://nodejs.org                   |
| npm                    | 10+ (comes with Node) | —                                    |
| JDK                    | 17                    | https://adoptium.net                 |
| Android Studio         | Latest                | https://developer.android.com/studio |
| Xcode (macOS only)     | 15+                   | App Store                            |
| CocoaPods (macOS only) | 1.14+                 | `sudo gem install cocoapods`         |

Full React Native environment guide: https://reactnative.dev/docs/set-up-your-environment

---

## Clone & Install / Clone Repo và Cài Dependencies

```bash
git clone https://github.com/LuongCongThanh/boilerplate-react-native.git
cd boilerplate-react-native

npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because some peer dependencies have not been updated for the latest React Native version.  
> Cần thêm `--legacy-peer-deps` vì một số thư viện chưa cập nhật peer deps cho phiên bản React Native mới nhất.

### iOS (macOS only)

```bash
cd ios && pod install && cd ..
```

---

## Environment Variables / Biến Môi Trường

Copy the example env file and fill in your values.  
Sao chép file env mẫu và điền giá trị phù hợp.

```bash
cp .env.example .env   # if an example exists
# or create .env manually
```

`.env` content:

```
API_URL=https://your-api-base-url.com
```

This variable is typed in `src/types/env.d.ts` — any new env vars you add must be declared there too.  
Biến này được khai báo kiểu trong `src/types/env.d.ts` — mỗi khi thêm biến mới phải khai báo ở đó.

---

## Run the App / Chạy App

### Start Metro bundler (required first / bước bắt buộc đầu tiên)

```bash
npm start
```

### Android

```bash
npm run android
```

Make sure an Android emulator is running or a physical device is connected with USB debugging enabled.  
Đảm bảo đang mở emulator Android hoặc kết nối thiết bị thật với USB debugging.

### iOS (macOS only)

```bash
npm run ios
```

Default simulator: iPhone 13. To change it, edit the `ios` script in `package.json`.  
Mặc định chạy trên iPhone 13. Muốn đổi simulator thì sửa script `ios` trong `package.json`.

---

## Linting & Formatting / Kiểm Tra Code

```bash
npm run lint       # ESLint check
```

Prettier runs automatically on `git commit` via Husky + lint-staged.  
Prettier tự chạy khi commit nhờ Husky + lint-staged — không cần chạy tay.

---

## Tests

```bash
npm test                  # run all tests
npm test -- --coverage    # with coverage report
npm test -- --watch       # watch mode
```

Test utilities live at `src/utils/test/index.tsx` — use `renderWithStore` for components that need Redux state.  
Tiện ích test nằm ở `src/utils/test/index.tsx` — dùng `renderWithStore` cho component cần Redux.

---

## Common Issues / Lỗi Thường Gặp

### Metro cache stale / Cache Metro bị cũ

```bash
npm start -- --reset-cache
```

### Android build fails / Build Android thất bại

```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS pods out of sync / Pods iOS không đồng bộ

```bash
cd ios && pod install --repo-update && cd ..
```

### TypeScript errors after pulling / Lỗi TypeScript sau khi pull

```bash
npm install --legacy-peer-deps
```
