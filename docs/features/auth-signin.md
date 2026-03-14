# Feature: User Sign-In

> **Status:** `Stable`  
> **Route:** `/signin`  
> **Components:** `SignInPage.tsx`, `SignInForm.tsx`  
> **API:** `POST /api/v1/auth/signin`

---

## 1. Overview

Allows registered users to authenticate with email and password. Upon successful authentication, the user receives JWT tokens (access + refresh) and is redirected to the dashboard.

---

## 2. User Stories

- As a registered user, I want to sign in to my account so that I can access my shortened URLs.
- As a user, I want to see validation errors immediately so that I can correct my input before submitting.
- As a user, I want to see a clear error message if my credentials are invalid.

---

## 3. Functional Requirements

1. User must provide: email and password.
2. Both fields are required.
3. Email must be a valid email format (client-side validation).
4. Form validation happens client-side (Zod) before submission.
5. On success, access and refresh tokens are stored and user is redirected to `/dashboard`.
6. On error (401), display "Invalid email or password."
7. On network error, display generic error message.

---

## 4. Non-Functional Requirements

- **Validation:** Zod schema validates email format and required fields.
- **Security:** Password sent over HTTPS; backend verifies with BCrypt.
- **Token storage:** Access token in memory (React context), refresh token in `localStorage`.
- **i18n:** All labels and error messages are in English (no i18n yet).
- **Accessibility:** Form inputs have proper labels and ARIA attributes.

---

## 5. User Flow

### Happy Path

```
User navigates to /signin
  → SignInPage renders SignInForm
  → User fills in: email, password
  → User clicks "Sign In"
  → Zod validates both fields
  → API call: POST /api/v1/auth/signin
  → Backend returns: { accessToken, refreshToken }
  → Tokens stored in AuthContext + localStorage
  → User redirected to /dashboard
```

### Invalid Credentials

```
User submits valid form with wrong password
  → API call: POST /api/v1/auth/signin
  → Backend returns 401 Unauthorized
  → Error message displayed: "Invalid email or password."
  → User corrects credentials and retries
```

---

## 6. Edge Cases & Alternative Flows

| Scenario | Trigger | Frontend Response |
|---|---|---|
| Invalid credentials | Backend returns 401 | Display: "Invalid email or password." |
| Invalid email format | Zod validation | Inline error: "Invalid email address" |
| Missing email | Zod validation | Inline error: "Email is required" |
| Missing password | Zod validation | Inline error: "Password is required" |
| Network error | Axios request fails | Display: "Network error. Please try again." |
| Backend unavailable | Axios timeout | Display: "Service unavailable. Please try again later." |

---

## 7. State Transitions

| From State | Event | To State |
|---|---|---|
| Unauthenticated | User navigates to `/signin` | SignInPage rendered |
| SignInPage | User submits valid form | API call in progress |
| API call in progress | Backend returns tokens | Authenticated, redirect to `/dashboard` |
| API call in progress | Backend returns 401 | Error displayed, stay on SignInPage |

---

## 8. Acceptance Criteria

- [ ] Given valid credentials, when form is submitted, then user is signed in and redirected to `/dashboard`.
- [ ] Given invalid credentials, when form is submitted, then "Invalid email or password" error is shown.
- [ ] Given invalid email format, when form is submitted, then inline validation error is shown.
- [ ] Given missing email, when form is submitted, then inline validation error is shown.
- [ ] Given missing password, when form is submitted, then inline validation error is shown.
- [ ] Given successful sign-in, then access token is stored in AuthContext.
- [ ] Given successful sign-in, then refresh token is stored in localStorage.

---

## 9. Data Model

### Request Payload

```typescript
interface SignInRequest {
  email: string;     // Required, valid email format
  password: string;  // Required, not blank
}
```

### Response Payload

```typescript
interface AuthTokens {
  accessToken: string;   // JWT, expires in 15 minutes
  refreshToken: string;  // JWT, expires in 7 days
}
```

---

## 10. Security & Privacy

- **Password transmission:** Sent over HTTPS only.
- **Password storage:** Never stored in frontend.
- **Token storage:** Access token in memory (AuthContext), refresh token in `localStorage`.
- **Brute force protection:** Backend implements rate limiting (100 req/min per IP).
- **Failed login logging:** Backend logs failed attempts for security monitoring.

---

## 11. Metrics & Observability

| Event | Log Level | Key Fields |
|---|---|---|
| `signin.attempt` | `INFO` | `email` (hashed) |
| `signin.success` | `INFO` | `userId` |
| `signin.failed` | `WARN` | `email` (hashed), `reason` |

---

## 12. Known Limitations

- No "remember me" checkbox — refresh token always stored in `localStorage`.
- No "forgot password" link — password reset not implemented.
- No "show password" toggle.
- No account lockout after multiple failed attempts.

---

## 13. Error Messages

| Scenario | Message |
|---|---|
| Invalid credentials | "Invalid email or password." |
| Invalid email format | "Invalid email address" |
| Missing email | "Email is required" |
| Missing password | "Password is required" |
| Network error | "Network error. Please try again." |
| Backend unavailable | "Service unavailable. Please try again later." |

---

## 14. Relationships to Other Features

- Leads to: `/dashboard` (after successful sign-in)
- Alternative: `/signup` (link at bottom of form)
- Shares token storage with: `auth-signup`, `auth-refresh-token`
- Triggers: `auth-refresh-token` (when access token expires)

---

## 15. Out of Scope

- Password reset / "Forgot password"
- "Remember me" checkbox
- "Show password" toggle
- Account lockout after failed attempts
- Two-factor authentication (2FA)

---

## 16. Open Questions

- [ ] Should we add "remember me" checkbox to control refresh token storage?
- [ ] Should we implement account lockout after N failed attempts?
- [ ] Should we add "forgot password" link?

---

## 17. Testing Notes

| Test File | What's Covered |
|---|---|
| `SignInForm.test.tsx` | Form rendering, validation errors, successful submission |

**Not covered by tests:**
- Backend error handling (401, 500)
- Network error handling
- Token storage in AuthContext + localStorage
- Redirect to `/dashboard` after success

---

## 18. Changelog

| Date | Change |
|---|---|
| 2025-01-15 | Initial spec created |
