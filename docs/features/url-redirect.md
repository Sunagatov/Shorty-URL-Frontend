# Feature: URL Redirect

> **Status:** `Stable`  
> **Route:** `/url/{urlHash}` (backend)  
> **Components:** none (direct browser redirect)  
> **API:** `GET /url/{urlHash}`

---

## 1. Overview

Redirects users from a shortened URL to the original destination URL. This is a public endpoint that requires no authentication. The redirect happens at the backend level — the frontend is not involved.

---

## 2. User Stories

- As a user, I want to click on a shortened URL so that I am redirected to the original website.
- As a user, I want the redirect to happen instantly without any intermediate pages.
- As a user, I want to see an error page if the shortened URL is invalid or expired.

---

## 3. Functional Requirements

1. User clicks on a shortened URL (e.g. `http://116.203.197.65/url/abc123`).
2. Backend receives `GET /url/abc123`.
3. Backend looks up `urlHash=abc123` in the database.
4. If found, backend returns `302 Found` with `Location: <originalUrl>`.
5. Browser automatically redirects to the original URL.
6. If not found, backend returns `404 Not Found` with error message.
7. No authentication required — this is a public endpoint.

---

## 4. Non-Functional Requirements

- **Performance:** Redirect happens in < 100ms (database lookup + redirect).
- **Caching:** URL mappings are cached for 1 hour to reduce database load.
- **Logging:** IP address and User-Agent are logged for analytics (future).
- **Rate limiting:** 100 requests per minute per IP to prevent abuse.
- **Security:** URL validation on creation prevents malicious URLs.

---

## 5. Redirect Flow

### Happy Path

```
User clicks: http://116.203.197.65/url/abc123
  → Browser sends: GET /url/abc123
  → Backend looks up urlHash='abc123' in database
  → Found: originalUrl='https://www.example.com'
  → Backend returns: 302 Found, Location: https://www.example.com
  → Browser redirects to https://www.example.com
```

### URL Not Found

```
User clicks: http://116.203.197.65/url/invalid
  → Browser sends: GET /url/invalid
  → Backend looks up urlHash='invalid' in database
  → Not found
  → Backend returns: 404 Not Found
  → Browser displays error page: "URL not found"
```

---

## 6. Edge Cases & Alternative Flows

| Scenario | Trigger | Backend Response |
|---|---|---|
| Valid shortened URL | urlHash exists in database | 302 redirect to originalUrl |
| Invalid urlHash | urlHash not found in database | 404 Not Found |
| Expired URL | expirationDate < now | 404 Not Found (cleanup job removes expired URLs) |
| Malformed urlHash | urlHash contains invalid characters | 404 Not Found |
| Empty urlHash | GET /url/ (no hash) | 404 Not Found |

---

## 7. State Transitions

This feature has no frontend state transitions — it is a direct backend redirect.

---

## 8. Acceptance Criteria

- [ ] Given valid shortened URL, when clicked, then user is redirected to original URL.
- [ ] Given invalid urlHash, when clicked, then 404 error is returned.
- [ ] Given expired URL, when clicked, then 404 error is returned.
- [ ] Given redirect happens, then response time is < 100ms.
- [ ] Given redirect happens, then IP and User-Agent are logged.

---

## 9. Data Model

### Request

```
GET /url/{urlHash}
```

### Response (Success)

```
HTTP/1.1 302 Found
Location: https://www.example.com/original-page
```

### Response (Error)

```json
{
  "errorCode": "URL_NOT_FOUND",
  "errorMessage": "Original URL is absent for urlHash='abc123'"
}
```

---

## 10. Security & Privacy

- **No authentication:** Public endpoint, no token required.
- **Rate limiting:** 100 requests per minute per IP to prevent abuse.
- **URL validation:** Malicious URLs are rejected at creation time.
- **Logging:** IP and User-Agent logged for analytics (not exposed to users).
- **HTTPS:** All redirects happen over HTTPS.

---

## 11. Metrics & Observability

| Event | Log Level | Key Fields |
|---|---|---|
| `redirect.attempt` | `INFO` | `urlHash`, `ip`, `userAgent` |
| `redirect.success` | `INFO` | `urlHash`, `originalUrl` |
| `redirect.failed` | `WARN` | `urlHash`, `reason` |

---

## 12. Known Limitations

- No click analytics — click count is not tracked yet.
- No geographic data — IP address is logged but not geolocated.
- No referrer tracking — referrer header is not logged.
- No device type detection — User-Agent is logged but not parsed.

---

## 13. Error Messages

| Scenario | Message |
|---|---|
| URL not found | "Original URL is absent for urlHash='abc123'" |
| Expired URL | "Original URL is absent for urlHash='abc123'" (same as not found) |

---

## 14. Relationships to Other Features

- Created by: `url-shorten` (shortened URLs are created here)
- Depends on: Backend database (URL mappings)
- Future: `url-analytics` (click tracking, geographic data)

---

## 15. Out of Scope

- Click analytics (click count, geographic data, device type)
- Referrer tracking
- Custom redirect pages (e.g. "You are being redirected...")
- QR code generation for shortened URLs

---

## 16. Open Questions

- [ ] Should we track click count for each shortened URL?
- [ ] Should we geolocate IP addresses for analytics?
- [ ] Should we show a custom redirect page instead of direct 302?

---

## 17. Testing Notes

| Test File | What's Covered |
|---|---|
| `UrlRedirectTest.java` (backend) | Valid redirect, invalid urlHash, expired URL |

**Not covered by tests:**
- Rate limiting
- Caching behavior
- IP and User-Agent logging
- Performance (< 100ms response time)

---

## 18. Changelog

| Date | Change |
|---|---|
| 2025-01-15 | Initial spec created |
