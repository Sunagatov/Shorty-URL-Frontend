# Feature: Refresh Access Token

> **Status:** `Stable`  
> **Route:** none (automatic background process)  
> **Components:** `axiosConfig.ts` (Axios interceptor)  
> **API:** `POST /api/v1/auth/refresh-token`

---

## 1. Overview

Automatically refreshes the access token when it expires (15 minutes) using the refresh token (7 days). This happens transparently via an Axios response interceptor — the user never sees a sign-in prompt unless the refresh token itself has expired.

---

## 2. User Stories

- As a signed-in user, I want my session to continue seamlessly so that I don't have to sign in again every 15 minutes.
- As a user, I want to be signed out automatically when my refresh token expires so that my account remains secure.

---

## 3. Functional Requirements

1. When any API call returns `401 Unauthorized`, the Axios interceptor catches it.
2. The interceptor retrieves the refresh token from `localStorage`.
3. If refresh token exists, call `POST /api/v1/auth/refresh-token` with `{ refreshToken }`.
4. If refresh succeeds, store the new access token and retry the original request.
5. If refresh fails (401), clear all tokens and redirect to `/signin`.
6. If refresh token is missing, redirect to `/signin` immediately.
7. Prevent infinite retry loops with `_retry` flag on the request config.

---

## 4. Non-Functional Requirements

- **Transparency:** User never sees a loading spinner or error during token refresh.
- **Retry logic:** Original request is retried exactly once after token refresh.
- **Token storage:** New access token stored in AuthContext; refresh token remains in `localStorage`.
- **Error handling:** If refresh fails, user is signed out and redirected to `/signin`.
- **Race condition guard:** `_retry` flag prevents infinite loops if refresh itself returns 401.

---

## 5. Token Refresh Flow

### Happy Path

```
User makes API call (e.g. GET /api/v1/urls)
  → Access token expired
  → Backend returns 401 Unauthorized
  → Axios interceptor catches 401
  → Check if request._retry is true → if yes, reject (prevent loop)
  → Set request._retry = true
  → Retrieve refresh token from localStorage
  → Call POST /api/v1/auth/refresh-token with { refreshToken }
  → Backend returns { accessToken }
  → Store new access token in AuthContext
  → Retry original request with new token
  → Original request succeeds
```

### Refresh Token Expired

```
User makes API call
  → Access token expired
  → Backend returns 401
  → Axios interceptor calls refresh endpoint
  → Backend returns 401 (refresh token expired)
  → Clear all tokens from AuthContext + localStorage
  → Redirect to /signin
```

---

## 6. Edge Cases & Alternative Flows

| Scenario | Trigger | Frontend Response |
|---|---|---|
| Access token expired | Backend returns 401 | Refresh token, retry request |
| Refresh token expired | Refresh endpoint returns 401 | Sign out, redirect to `/signin` |
| Refresh token missing | No token in `localStorage` | Sign out, redirect to `/signin` |
| Refresh endpoint unavailable | Network error during refresh | Sign out, redirect to `/signin` |
| Original request fails after retry | Retry returns 401 again | Sign out, redirect to `/signin` (loop guard) |

---

## 7. State Transitions

| From State | Event | To State |
|---|---|---|
| Authenticated | API call returns 401 | Token refresh in progress |
| Token refresh in progress | Refresh succeeds | Authenticated, original request retried |
| Token refresh in progress | Refresh fails (401) | Unauthenticated, redirect to `/signin` |

---

## 8. Acceptance Criteria

- [ ] Given access token expired, when API call returns 401, then token is refreshed automatically.
- [ ] Given refresh succeeds, when new token is received, then original request is retried.
- [ ] Given refresh token expired, when refresh endpoint returns 401, then user is signed out.
- [ ] Given refresh token missing, when 401 occurs, then user is redirected to `/signin`.
- [ ] Given refresh fails, then all tokens are cleared from AuthContext and `localStorage`.
- [ ] Given original request retried, when it returns 401 again, then user is signed out (loop guard).

---

## 9. Data Model

### Request Payload

```typescript
interface RefreshTokenRequest {
  refreshToken: string;  // JWT from localStorage
}
```

### Response Payload

```typescript
interface RefreshTokenResponse {
  accessToken: string;  // New JWT, expires in 15 minutes
}
```

---

## 10. Security & Privacy

- **Token transmission:** Refresh token sent over HTTPS only.
- **Token storage:** Access token in memory (AuthContext), refresh token in `localStorage`.
- **Token rotation:** Backend may rotate refresh token on each refresh (not implemented yet).
- **Loop prevention:** `_retry` flag prevents infinite retry loops.
- **Automatic sign-out:** User is signed out if refresh fails, preventing unauthorized access.

---

## 11. Metrics & Observability

| Event | Log Level | Key Fields |
|---|---|---|
| `token.refresh.attempt` | `DEBUG` | `userId` |
| `token.refresh.success` | `DEBUG` | `userId` |
| `token.refresh.failed` | `WARN` | `userId`, `reason` |

---

## 12. Known Limitations

- **No refresh token rotation:** Refresh token is not rotated on each refresh (security risk).
- **No retry on network error:** If refresh endpoint is unavailable, user is signed out immediately.
- **No exponential backoff:** Refresh is attempted exactly once; no retry logic.
- **No user notification:** User is signed out silently if refresh fails.

---

## 13. Error Messages

This feature has no user-facing error messages — it operates silently in the background. If refresh fails, the user is redirected to `/signin` without explanation.

---

## 14. Relationships to Other Features

- Triggered by: Any authenticated API call that returns 401
- Depends on: `auth-signin`, `auth-signup` (token storage)
- Leads to: `/signin` (if refresh fails)

---

## 15. Out of Scope

- Refresh token rotation
- Retry logic for network errors
- User notification when signed out
- Exponential backoff for refresh attempts

---

## 16. Open Questions

- [ ] Should we implement refresh token rotation for better security?
- [ ] Should we notify the user when they are signed out due to expired refresh token?
- [ ] Should we retry refresh on network error instead of signing out immediately?

---

## 17. Testing Notes

| Test File | What's Covered |
|---|---|
| `axiosConfig.test.ts` | Interceptor logic, retry mechanism, loop guard |

**Not covered by tests:**
- Integration with AuthContext
- Token storage in `localStorage`
- Redirect to `/signin` after failed refresh
- Race conditions with multiple simultaneous 401 responses

---

## 18. Changelog

| Date | Change |
|---|---|
| 2025-01-15 | Initial spec created |
