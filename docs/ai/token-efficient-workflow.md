# Token-Efficient Workflow for AI Tools

The goal is not "read the whole repo." The goal is "read only enough to make a correct change."

## Default workflow

### 1) Identify the task class
Choose one:
- auth
- routing
- URL creation / mapping
- profile / user account
- validation
- styling / UI
- test-only
- config / build

### 2) Read the smallest relevant file set
Use the file clusters from:
- `CLAUDE.md`
- `docs/ai/repo-overview.md`

### 3) Build a narrow plan
Only note:
- files to change
- why each file needs change
- likely side effects
- tests to run

### 4) Make the minimum change
Prefer:
- reusing constants
- reusing types
- reusing `ApiService`
- reusing `useApi`
- reusing existing UI primitives

Avoid:
- unrelated cleanup
- framework migrations
- broad renames
- style churn
- dependency changes without need

### 5) Output only what matters
Best output style:
- short diagnosis
- changed files list
- patch or replacement blocks only for touched code
- exact commands to verify

## Reading matrix

### Auth bug
Read:
- `src/components/SignIn.tsx`
- `src/components/SignUp.tsx`
- `src/context/AuthContext.tsx`
- `src/services/AuthService.ts`
- `src/services/ApiService.ts`
- `src/axiosConfig.ts`
- `src/utils/storage.ts`
- `src/utils/validation.ts`
- `src/types/index.ts`

### Route bug
Read:
- `src/App.tsx`
- `src/constants/index.ts`
- `src/layouts/MainLayout.tsx`
- target component

### URL feature
Read:
- `src/components/UrlShortener.tsx`
- `src/services/ApiService.ts`
- `src/hooks/useApi.ts`
- `src/constants/index.ts`
- `src/types/index.ts`

### Form issue
Read:
- target component
- `src/utils/validation.ts`
- `src/components/ui/Input.tsx` if relevant
- `src/types/index.ts`

### Build or env issue
Read:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/axiosConfig.ts`
- `README.md`

## Rules that reduce waste

- Do not restate full files unless asked.
- Do not summarize obvious boilerplate.
- Do not inspect unrelated components "just in case."
- Do not propose changes in files you have not actually checked.
- Do not trust stale docs over current code.
- If a task touches only one route, do not scan the whole app.
- If a task is local UI-only, do not inspect auth internals.

## Verification commands

```bash
npm run type-check
npm run test
npm run build
```

Add `npm run test:e2e` only when the change affects user flows covered by Playwright.
