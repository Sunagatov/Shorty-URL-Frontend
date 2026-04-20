# GitHub Copilot Instructions

Work with the current Shorty URL Frontend architecture, not a generic React template.

## Repository facts

- React 19 + TypeScript 5 + Vite 8
- Entry point is `src/index.tsx`
- Vite env prefix is configured as `REACT_APP_`
- Required base URL env variable is `REACT_APP_BACKEND_REST_API_URL`
- Build output is `build/`
- Routing lives in `src/App.tsx` and `src/constants/index.ts`
- API calls live in `src/services/ApiService.ts`
- Axios refresh-token logic lives in `src/axiosConfig.ts`
- Auth state lives in `src/context/AuthContext.tsx` and `src/services/AuthService.ts`
- Local storage helpers live in `src/utils/storage.ts`
- Validation lives in `src/utils/validation.ts`

## Preferred implementation style

- Make minimal, targeted edits.
- Reuse existing constants, types, hooks, services, and UI components.
- Keep endpoint paths and route paths centralized in `src/constants/index.ts`.
- Keep API calls in `src/services/ApiService.ts`.
- Prefer the existing `useApi` + `axios` pattern for incremental changes.
- Preserve strict TypeScript.

## Avoid incorrect assumptions

- Do not assume `main.tsx`.
- Do not change env variables to `VITE_*`.
- Do not assume `dist/` is the build output.
- Do not trust old docs over current code.
- Do not introduce Redux, Zustand, or React Query rewrites unless explicitly requested.
