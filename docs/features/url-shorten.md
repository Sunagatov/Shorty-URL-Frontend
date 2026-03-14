# Feature: Shorten URL

> **Status:** `Stable`  
> **Route:** `/dashboard`  
> **Components:** `Dashboard.tsx`, `UrlShortenerForm.tsx`  
> **API:** `POST /api/v1/urls`

---

## 1. Overview

Allows authenticated users to shorten a long URL with an optional expiration period. The shortened URL is displayed immediately and can be copied to the clipboard. The URL is saved to the user's account and appears in their URL list.

---

## 2. User Stories

- As a user, I want to shorten a long URL so that I can share it easily.
- As a user, I want to set an expiration date so that the link stops working after a certain time.
- As a user, I want to copy the shortened URL to my clipboard with one click.
- As a user, I want to see my shortened URL immediately after creation.

---

## 3. Functional Requirements

1. User must be authenticated to shorten URLs.
2. User must provide a valid URL (http:// or https://).
3. User can optionally specify expiration in days (default: 30 days).
4. URL must not contain spaces.
5. URL must not exceed 2048 characters.
6. Form validation happens client-side (Zod) before submission.
7. On success, shortened URL is displayed with a "Copy" button.
8. On success, the new URL is added to the user's URL list.
9. Duplicate URLs return the existing shortened URL (idempotent).

---

## 4. Non-Functional Requirements

- **Validation:** Zod schema validates URL format, length, and no spaces.
- **Security:** Requires valid access token in Authorization header.
- **Token refresh:** If access token expired, Axios interceptor refreshes it automatically.
- **i18n:** All labels and error messages are in English (no i18n yet).
- **Accessibility:** Form inputs have proper labels and ARIA attributes.

---

## 5. User Flow

### Happy Path

```
User navigates to /dashboard
  → Dashboard renders UrlShortenerForm
  → User enters originalUrl: "https://example.com/very/long/url"
  → User optionally sets daysCount: 30
  → User clicks "Shorten"
  → Zod validates URL format and length
  → API call: POST /api/v1/urls with { originalUrl, daysCount }
  → Backend returns: { shortUrl: "http://116.203.197.65/url/abc123" }
  → Shortened URL displayed with "Copy" button
  → User clicks "Copy" → URL copied to clipboard
  → Success toast: "Copied to clipboard!"
```

### Duplicate URL

```
User enters URL that was already shortened
  → API call: POST /api/v1/urls
  → Backend returns existing shortUrl (idempotent)
  → Shortened URL displayed
```

---

## 6. Edge Cases & Alternative Flows

| Scenario | Trigger | Frontend Response |
|---|---|---|
| URL contains spaces | Zod validation | Inline error: "URL must not contain spaces" |
| URL too long (>2048) | Zod validation | Inline error: "URL too long (max 2048 characters)" |
| Invalid URL format | Zod validation | Inline error: "Invalid URL format" |
| Missing URL | Zod validation | Inline error: "URL is required" |
| Duplicate URL | Backend returns existing shortUrl | Display existing shortUrl (no error) |
| Access token expired | Backend returns 401 | Axios interceptor refreshes token, retries request |
| Network error | Axios request fails | Display: "Network error. Please try again." |
| Backend unavailable | Axios timeout | Display: "Service unavailable. Please try again later." |

---

## 7. State Transitions

| From State | Event | To State |
|---|---|---|
| Dashboard | User enters URL and clicks "Shorten" | API call in progress |
| API call in progress | Backend returns shortUrl | Shortened URL displayed |
| API call in progress | Backend returns error | Error displayed, stay on Dashboard |

---

## 8. Acceptance Criteria

- [ ] Given valid URL, when form is submitted, then shortened URL is returned and displayed.
- [ ] Given URL with spaces, when form is submitted, then inline validation error is shown.
- [ ] Given URL > 2048 characters, when form is submitted, then inline validation error is shown.
- [ ] Given invalid URL format, when form is submitted, then inline validation error is shown.
- [ ] Given duplicate URL, when form is submitted, then existing shortened URL is returned.
- [ ] Given shortened URL displayed, when "Copy" is clicked, then URL is copied to clipboard.
- [ ] Given successful shortening, then new URL appears in the user's URL list.

---

## 9. Data Model

### Request Payload

```typescript
interface CreateUrlRequest {
  originalUrl: string;  // Required, valid URL, max 2048 chars, no spaces
  daysCount?: number;   // Optional, default: 30 days
}
```

### Response Payload

```typescript
interface UrlMapping {
  shortUrl: string;  // e.g. "http://116.203.197.65/url/abc123"
}
```

---

## 10. Security & Privacy

- **Authentication:** Requires valid access token in Authorization header.
- **Token refresh:** Axios interceptor handles expired tokens automatically.
- **URL validation:** Backend validates URL format and rejects malicious URLs.
- **Rate limiting:** Backend enforces 100 requests per minute per IP.
- **Ownership:** URLs are scoped to the authenticated user.

---

## 11. Metrics & Observability

| Event | Log Level | Key Fields |
|---|---|---|
| `url.shorten.attempt` | `INFO` | `userId`, `originalUrl` (hashed) |
| `url.shorten.success` | `INFO` | `userId`, `shortUrl` |
| `url.shorten.failed` | `WARN` | `userId`, `reason` |

---

## 12. Known Limitations

- No custom short URL aliases — hash is auto-generated by backend.
- No QR code generation for shortened URLs.
- No URL preview before shortening.
- No bulk URL shortening.

---

## 13. Error Messages

| Scenario | Message |
|---|---|
| URL contains spaces | "URL must not contain spaces" |
| URL too long | "URL too long (max 2048 characters)" |
| Invalid URL format | "Invalid URL format" |
| Missing URL | "URL is required" |
| Network error | "Network error. Please try again." |
| Backend unavailable | "Service unavailable. Please try again later." |

---

## 14. Relationships to Other Features

- Requires: `auth-signin` or `auth-signup` (authentication)
- Triggers: `auth-refresh-token` (if access token expired)
- Affects: URL list on dashboard (new URL added)
- Related: `url-redirect` (shortened URL redirects to original)

---

## 15. Out of Scope

- Custom short URL aliases
- QR code generation
- URL preview
- Bulk URL shortening
- URL analytics (click count, geographic data)

---

## 16. Open Questions

- [ ] Should we add custom alias support?
- [ ] Should we generate QR codes for shortened URLs?
- [ ] Should we show a preview of the original URL before shortening?

---

## 17. Testing Notes

| Test File | What's Covered |
|---|---|
| `UrlShortenerForm.test.tsx` | Form rendering, validation errors, successful submission |

**Not covered by tests:**
- Backend error handling (400, 401, 500)
- Network error handling
- Duplicate URL handling
- Copy to clipboard functionality
- URL list update after successful shortening

---

## 18. Changelog

| Date | Change |
|---|---|
| 2025-01-15 | Initial spec created |
