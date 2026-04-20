# Repo Overview — Shorty URL Frontend

## What this app is

Shorty URL Frontend is a React single-page application for:

- shortening URLs
- signing users in and up
- storing auth tokens
- showing user account and URL mapping screens
- calling a backend REST API

## Current runtime shape

### Entry and shell

- App entry: `src/index.tsx`
- Router shell: `src/App.tsx`
- Layout shell: `src/layouts/MainLayout.tsx`

### Core flows

#### Public flow
- Home page renders `UrlShortener`
- User can submit a long URL
- App calls `ApiService.createUrl`
- Result short URL is displayed and can be copied

#### Auth flow
- Sign-in component: `src/components/SignIn.tsx`
- Sign-up component: `src/components/SignUp.tsx`
- Auth state container: `src/context/AuthContext.tsx`
- Auth service singleton: `src/services/AuthService.ts`
- Token and user persistence: `src/utils/storage.ts`
- Axios refresh handling: `src/axiosConfig.ts`

#### Account flow
Routes are mounted in `src/App.tsx`:
- `/account/dashboard`
- `/account/profile`
- `/account/security`
- `/account/url-mappings`
- `/account/url-mappings/:urlHash`

## Important directories

```text
src/
├── components/          # Page-like components and shared UI
├── components/ui/       # Reusable design system-style primitives
├── constants/           # API paths, route paths, storage keys, validation messages
├── context/             # React context providers
├── hooks/               # Custom hooks such as useApi and useAuth
├── layouts/             # App shell layout
├── services/            # API layer and auth service
├── types/               # Shared TypeScript models
└── utils/               # Storage and validation helpers
```

## Architectural preferences already present in code

- Route paths centralized in `src/constants/index.ts`
- API endpoint paths centralized in `src/constants/index.ts`
- API requests centralized in `src/services/ApiService.ts`
- Shared request error/loading behavior via `src/hooks/useApi.ts`
- Auth updates propagated via `AuthService` listener pattern
- Axios request interceptor adds access token
- Axios response interceptor refreshes token on 401

## Constraints that matter to AI tools

- The repo is Vite-based but intentionally uses `REACT_APP_*` env names.
- Current code prefers custom hooks + axios over React Query for actual request execution.
- Current code stores tokens through `storage.ts`. Do not assume a different persistence model without checking code.
- Docs under `docs/features` contain useful intent, but not all implementation details are current.

## Useful file clusters by task

### New auth feature
- `src/components/SignIn.tsx`
- `src/components/SignUp.tsx`
- `src/context/AuthContext.tsx`
- `src/services/AuthService.ts`
- `src/services/ApiService.ts`
- `src/axiosConfig.ts`
- `src/utils/storage.ts`
- `src/utils/validation.ts`
- `src/types/index.ts`

### New URL feature
- `src/components/UrlShortener.tsx`
- `src/components/UserUrlMappings.tsx`
- `src/components/UrlMappingDetails.tsx`
- `src/services/ApiService.ts`
- `src/hooks/useApi.ts`
- `src/types/index.ts`
- `src/constants/index.ts`

### Route or navigation work
- `src/App.tsx`
- `src/layouts/MainLayout.tsx`
- `src/constants/index.ts`

### Shared UI work
- target component
- `src/components/ui/*`
- `src/index.css`
