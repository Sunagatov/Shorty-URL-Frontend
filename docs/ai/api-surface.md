# API Surface and Frontend Contracts

## Required environment variable

```env
REACT_APP_BACKEND_REST_API_URL=<backend-base-url>
```

This value is read through `import.meta.env.REACT_APP_BACKEND_REST_API_URL`.

## Endpoint constants

Defined in `src/constants/index.ts`.

### Auth
- `POST /api/v1/auth/signin`
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/logout`

### URLs
- `POST /api/v1/urls`
- `GET /api/v1/urls`
- `GET /api/v1/urls/:hash`
- `DELETE /api/v1/urls/:hash`

### User
- `GET /api/v1/user/profile`
- `PUT /api/v1/user/profile`

## Frontend request helpers

All current API methods are in `src/services/ApiService.ts`.

### Auth methods
- `signIn(data: SignInRequest)`
- `signUp(data: SignUpRequest)`
- `refreshToken(refreshToken: string)`

### URL methods
- `createUrl(data: CreateUrlRequest)`
- `getUserUrls()`
- `getUrlDetails(hash: string)`
- `deleteUrl(hash: string)`

### User methods
- `getUserProfile()`
- `updateUserProfile(data: Partial<User>)`

## Shared frontend types

Defined in `src/types/index.ts`.

### User
```ts
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}
```

### UrlMapping
```ts
interface UrlMapping {
  id: string;
  originalUrl: string;
  shortUrl: string;
  urlHash: string;
  createdAt: string;
  expiresAt?: string;
  clickCount: number;
  isActive: boolean;
  userId?: string;
}
```

### AuthTokens
```ts
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
```

### SignInRequest
```ts
interface SignInRequest {
  email: string;
  password: string;
}
```

### SignUpRequest
```ts
interface SignUpRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
```

### CreateUrlRequest
```ts
interface CreateUrlRequest {
  originalUrl: string;
  customAlias?: string;
  expiresAt?: string;
}
```

## Route constants

Defined in `src/constants/index.ts`.

- `/`
- `/signin`
- `/signup`
- `/account/dashboard`
- `/account/profile`
- `/account/security`
- `/account/url-mappings`
- `/account/url-mappings/:urlHash`

## Auth persistence model in current code

Storage keys:
- `accessToken`
- `refreshToken`
- `user`

Current source of truth:
- `src/utils/storage.ts`
- `src/services/AuthService.ts`
- `src/context/AuthContext.tsx`

## Token refresh flow

Implemented in `src/axiosConfig.ts`.

Flow:
1. Request interceptor adds `Authorization: Bearer <accessToken>` if present.
2. Response interceptor checks for `401`.
3. If request has not already retried and refresh token exists:
   - POST to `/api/v1/auth/refresh-token`
   - save new access token
   - retry original request
4. If refresh fails:
   - call `AuthService.logout()`
   - redirect to `/` when not already there

## Validation schemas

Defined in `src/utils/validation.ts`.

- `signInSchema`
- `signUpSchema`
- `createUrlSchema`

Use existing schemas and extend them when possible instead of creating parallel validation logic.
