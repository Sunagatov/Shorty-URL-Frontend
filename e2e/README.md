# E2E Tests with Playwright

This directory contains end-to-end tests for the URL Shortener application using Playwright.

## Test Files

- `auth.spec.ts` - Authentication flow tests (sign up, sign in, validation)
- `url-shortening.spec.ts` - URL shortening functionality tests
- `helpers.ts` - Reusable test utilities

## Running Tests

### Prerequisites

1. Backend must be running on `http://localhost:8080`
2. Frontend dev server will start automatically on `http://localhost:3001`

### Commands

```bash
# Run all tests (headless)
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Show test report
npm run test:e2e:report
```

## Rate Limiter Considerations

The tests are configured to handle the backend rate limiter:

1. **Sequential execution** - Tests run one at a time (`workers: 1`)
2. **Delays between tests** - 1-2 second delays between test cases
3. **Unique test data** - Each test uses unique email addresses
4. **Graceful handling** - Tests check for rate limit messages

## Test Coverage

### Authentication Tests
- ✅ Display sign up page
- ✅ Validate required fields
- ✅ Successfully sign up new user
- ✅ Navigate to sign in page
- ✅ Sign in with existing credentials
- ✅ Show error for invalid credentials

### URL Shortening Tests
- ✅ Display URL shortening form
- ✅ Shorten URL successfully
- ✅ Validate URL format
- ✅ Copy shortened URL to clipboard
- ✅ Display list of shortened URLs
- ✅ Handle rate limiting gracefully

## Configuration

See `playwright.config.ts` for configuration details:
- Single worker to avoid rate limiting
- Sequential test execution
- Automatic dev server startup
- Screenshot on failure
- HTML reporter

## Troubleshooting

### Rate Limit Errors
If you see 429 errors, increase delays in tests:
```typescript
await page.waitForTimeout(3000); // Increase from 2000 to 3000
```

### Backend Not Running
Ensure backend is running:
```bash
cd /Users/zufar/IdeaProjects/URL-Shortener
docker compose -f docker-compose.local-with-prod-db.yml up -d
```

### Frontend Port Conflict
If port 3001 is in use, update `playwright.config.ts`:
```typescript
baseURL: 'http://localhost:3002',
```
