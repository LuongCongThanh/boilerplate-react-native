# Context

React Native boilerplate — single-context project.

## Glossary

### Module

A self-contained feature folder under `src/modules/` (e.g. `auth`, `main`, `setting`). A Module owns its routes, screens, services, state slices, and translations. Modules do not import from each other.

### Screen

A top-level React component rendered by the navigator. Screens live at `modules/<name>/screens/<ScreenName>/index.tsx`. Screens use named exports and do not use `React.memo`.

### Component

A reusable UI element in `src/components/core/`. A component belongs here only if it is used across ≥ 2 Modules. Components use named exports. Props are typed with a `<ComponentName>Props` interface.

### Selector

A pure function in `src/store/selectors/` that reads a value from Redux state. Components must never access `state.*` directly — always go through a Selector.

### Error Bus

The `DeviceEventEmitter`-based pub/sub in `src/services/event/alert.ts`. The Redux error middleware publishes to it; `ErrorPopup` subscribes. Decouples error display from component trees.

### HTTP Client

The `IHttpClient` interface and `createHttpClient` factory in `src/services/network/http.ts`. Each Module's API class calls the singleton instance (`src/services/network/api.ts`).

### Async Thunk

A `createAsyncThunk` function in a Module's `store/slice/`. Responsible for calling the Module's API, returning data on success, and calling `rejectWithValue` on failure. Never handles error display — that is the Error Middleware's job.

### Error Middleware

The Redux middleware in `src/store/middleware/errorMiddleware.ts`. Intercepts all rejected Async Thunks and emits to the Error Bus. Components do not need to handle errors from dispatched thunks.
