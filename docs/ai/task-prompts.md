# Repo-Specific Prompt Templates

These templates are designed to help AI tools work faster and cheaper on this repository.

## 1) Bug fix prompt

```text
Work on Sunagatov/Shorty-URL-Frontend.

Before proposing changes, read only the minimum relevant files.
Use current code as truth over older docs.
Do not introduce new abstractions unless necessary.
Keep route paths and API endpoints centralized.
Prefer the existing useApi + ApiService + axios approach.

Task:
<describe the bug>

Output:
1. Root cause
2. Exact files to change
3. Minimal patch
4. Tests or checks to run
```

## 2) Feature prompt

```text
Work on Sunagatov/Shorty-URL-Frontend.

Read only the relevant files for this feature.
Respect existing patterns:
- src/constants/index.ts for routes/endpoints
- src/services/ApiService.ts for API calls
- src/hooks/useApi.ts for request state
- src/utils/validation.ts for form validation

Task:
<describe the feature>

Constraints:
- no unrelated refactors
- no framework migration
- keep TypeScript strict

Output:
1. Files to change
2. Why each file changes
3. Concrete code changes
4. Verification steps
```

## 3) Auth task prompt

```text
Work on the auth flow in Sunagatov/Shorty-URL-Frontend.

Read first:
- src/components/SignIn.tsx
- src/components/SignUp.tsx
- src/context/AuthContext.tsx
- src/services/AuthService.ts
- src/services/ApiService.ts
- src/axiosConfig.ts
- src/utils/storage.ts
- src/utils/validation.ts
- src/types/index.ts
- src/constants/index.ts

Important:
- Current code uses REACT_APP_BACKEND_REST_API_URL
- Current code persists tokens through storage.ts
- Do not follow stale docs over source code

Task:
<describe auth change>

Output:
1. Root cause / design impact
2. Exact patch
3. Side effects
4. Checks to run
```

## 4) UI-only task prompt

```text
Work on a UI-only task in Sunagatov/Shorty-URL-Frontend.

Do not inspect unrelated auth or API files unless the task actually needs them.
Prefer editing only the target component and shared UI primitives if required.
Keep behavior unchanged unless explicitly asked.

Task:
<describe UI task>

Output:
1. Files to change
2. Minimal code patch
3. Visual / functional risks
4. Checks to run
```
