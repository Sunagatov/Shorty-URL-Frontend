# Truth Sources and Known Drift

This file exists to prevent AI tools from wasting tokens on stale or conflicting assumptions.

## Trust order

1. Current code under `src/`
2. Config files (`package.json`, `vite.config.ts`, `tsconfig.json`)
3. Constants and types
4. README
5. Older docs under `docs/features`

## Verified drift between docs and code

### 1) Build output folder
- README says production files are in `dist/`
- Actual Vite config sets `build.outDir = 'build'`

Use `build/` as truth.

### 2) Entry file
- Many Vite examples assume `src/main.tsx`
- Actual entry file is `src/index.tsx`

Use `src/index.tsx` as truth.

### 3) Environment variable naming
- Many Vite examples assume `VITE_*`
- Actual config sets `envPrefix: 'REACT_APP_'`
- Current code reads `import.meta.env.REACT_APP_BACKEND_REST_API_URL`

Use `REACT_APP_BACKEND_REST_API_URL` as truth.

### 4) Auth persistence wording in older docs
- Some docs describe access token in memory and refresh token in localStorage
- Actual current code stores tokens through `src/utils/storage.ts`, which writes both access and refresh tokens to localStorage

Use code as truth.

### 5) Sign-in docs vs current component structure
- `docs/features/auth-signin.md` references `SignInPage.tsx` and `SignInForm.tsx`
- Actual route component is `src/components/SignIn.tsx`

Use current component tree as truth.

### 6) Post-login navigation
- Some docs mention redirecting to `/dashboard`
- Current route constants define dashboard as `/account/dashboard`
- Current `SignIn.tsx` and `SignUp.tsx` navigate to `ROUTES.HOME` after success

Use current route constants and component behavior as truth.

### 7) Data fetching abstraction
- `@tanstack/react-query` is installed
- Current implementation for core flows uses `useApi` + `ApiService` + `axiosInstance`

For incremental work, follow the current implementation unless an explicit migration is requested.

## How to use this file

Before changing auth, routing, build config, or environment handling, check this file so you do not follow stale docs or generic React/Vite assumptions.
