# Feature: User Sign-Up

> **Status:** `Stable`  
> **Route:** `/signup`  
> **Components:** `SignUpPage.tsx`, `SignUpForm.tsx`  
> **API:** `POST /api/v1/auth/signup`

---

## 1. Overview

Allows new users to create an account by providing personal information and credentials. Upon successful registration, the user receives JWT tokens (access + refresh) and is automatically signed in.

---

## 2. User Stories

- As a new user, I want to create an account so that I can save and manage my shortened URLs.
- As a new user, I want to see validation errors immediately so that I can correct my input before submitting.
- As a new user, I want to be automatically signed in after registration so that I don't have to sign in again.

---

## 3. Functional Requirements

1. User must provide: first name, last name, email, password, country, and age.
2. Email must be unique — duplicate emails are rejected by the backend.
3. Password must be at least 8 characters.
4. All fields are required.
5. Form validation happens client-side (Zod) before submission.
6. On success, access and refresh tokens are stored and user is redirected to `/dashboard`.
7. On error, an error message is displayed above the form.

---

## 4. Non-Functional Requirements

- **Validation:** Zod schema validates all fields before API call.
- **Security:** Password is sent over HTTPS; backend hashes it with BCrypt.
- **Token storage:** Access token in memory (React context), refresh token in `localStorage`.
- **i18n:** All labels and error messages are in English (no i18n yet).
- **Accessibility:** Form inputs have proper labels and ARIA attributes.

---

## 5. User Flow

### Happy Path

```
User navigates to /signup
  → SignUpPage renders SignUpForm
  → User fills in: firstName, lastName, email, password, country, age
  → User clicks "Sign Up"
  → Zod validates all fields
  → API call: POST /api/v1/auth/signup
  → Backend returns: { accessToken, refreshToken }
  → Tokens stored in AuthContext + localStorage
  → User redirected to /dashboard
```

### Validation Errors

```
User fills in form with invalid data
  → User clicks "Sign Up"
  → Zod validation fails
  → Error messages displayed inline below each field
  → Form is not submitted
```

### Backend Errors

```
User submits valid form
  → API call: POST /api/v1/auth/signup
  → Backend returns 409 Conflict (email already exists)
  → Error message displayed: "Email is already in use."
  → User corrects email and retries
```

---

## 6. Edge Cases & Alternative Flows

| Scenario | Trigger | Frontend Response |
|---|---|---|
| Email already exists | Backend returns 409 | Display: "Email is already in use." |
| Invalid email format | Zod validation | Inline error: "Invalid email address" |
| Password too short | Zod validation | Inline error: "Password must be at least 8 characters" |
| Missing required field | Zod validation | Inline error: "This field is required" |
| Network error | Axios request fails | Display: "Network error. Please try again." |
| Backend unavailable | Axios timeout | Display: "Service unavailable. Please try again later." |

---

## 7. State Transitions

| From State | Event | To State |
|---|---|---|
| Unauthenticated | User navigates to `/signup` | SignUpPage rendered |
| SignUpPage | User submits valid form | API call in progress |
| API call in progress | Backend returns tokens | Authenticated, redirect to `/dashboard` |
| API call in progress | Backend returns error | Error displayed, stay on SignUpPage |

---

## 8. Acceptance Criteria

- [ ] Given valid input, when form is submitted, then user is registered and signed in.
- [ ] Given duplicate email, when form is submitted, then "Email is already in use" error is shown.
- [ ] Given invalid email format, when form is submitted, then inline validation error is shown.
- [ ] Given password < 8 characters, when form is submitted, then inline validation error is shown.
- [ ] Given missing required field, when form is submitted, then inline validation error is shown.
- [ ] Given successful registration, then access token is stored in AuthContext.
- [ ] Given successful registration, then refresh token is stored in localStorage.
- [ ] Given successful registration, then user is redirected to `/dashboard`.

---

## 9. Data Model

### Request Payload

```typescript
interface SignUpRequest {
  firstName: string;    // Required, not blank
  lastName: string;     // Required, not blank
  email: string;        // Required, valid email format
  password: string;     // Required, min 8 characters
  country: string;      // Required, not blank
  age: number;          // Required, positive integer
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
- **Password storage:** Never stored in frontend; backend hashes with BCrypt.
- **Token storage:** Access token in memory (AuthContext), refresh token in `localStorage`.
- **CSRF protection:** Not applicable (stateless JWT).
- **XSS protection:** React escapes all user input by default.

---

## 11. Metrics & Observability

| Event | Log Level | Key Fields |
|---|---|---|
| `signup.attempt` | `INFO` | `email` (hashed) |
| `signup.success` | `INFO` | `userId` |
| `signup.failed` | `WARN` | `email` (hashed), `reason` |

---

## 12. Known Limitations

- No email verification — users can register with any email.
- No CAPTCHA — vulnerable to bot registrations.
- No password strength indicator — only minimum length enforced.
- No "show password" toggle.

---

## 13. Error Messages

| Scenario | Message |
|---|---|
| Email already exists | "Email is already in use." |
| Invalid email format | "Invalid email address" |
| Password too short | "Password must be at least 8 characters" |
| Missing required field | "This field is required" |
| Network error | "Network error. Please try again." |
| Backend unavailable | "Service unavailable. Please try again later." |

---

## 14. Relationships to Other Features

- Leads to: `/dashboard` (after successful registration)
- Alternative: `/signin` (link at bottom of form)
- Shares token storage with: `auth-signin`, `auth-refresh-token`

---

## 15. Out of Scope

- Email verification
- Social sign-up (Google OAuth) — see separate feature
- Password strength indicator
- "Show password" toggle
- Terms of service checkbox

---

## 16. Open Questions

- [ ] Should we add email verification before allowing sign-in?
- [ ] Should we add CAPTCHA to prevent bot registrations?
- [ ] Should we enforce stronger password requirements (uppercase, numbers, symbols)?

---

## 17. Testing Notes

| Test File | What's Covered |
|---|---|
| `SignUpForm.test.tsx` | Form rendering, validation errors, successful submission |

**Not covered by tests:**
- Backend error handling (409, 500)
- Network error handling
- Token storage in AuthContext + localStorage
- Redirect to `/dashboard` after success

---

## 18. Changelog

| Date | Change |
|---|---|
| 2025-01-15 | Initial spec created |
