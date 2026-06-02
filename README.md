# Client — Next.js App Router

Everything lives under `src/`; the `@/` alias points there. `app/` is routing,
`components/` is UI, and logic lives in `hooks/ · redux/ · provider/`.

## Run

```bash
npm install
cp .env.local.example .env.local   # then fill in values
npm run dev                        # http://localhost:3000
```

`/api/*` is proxied to the backend by `next.config.mjs` (set `BACKEND_URL`).

## State, in one rule

- **Server data** (lists from the API) → **React Query** (`useQuery` + `useAxiosSecure`).
- **Client state** (who's logged in, role, UI toggles) → **Redux** (`redux/features/*`).

## Where things go

| Need | Folder |
|---|---|
| A new page / URL | a folder + `page.jsx` under `src/app/` |
| Reusable button/card/badge | `src/components/ui/` |
| Feature card/table/modal | `src/components/<feature>/` |
| Data fetching | a hook in `src/hooks/` (React Query) |
| "Who is logged in / role" | `useAuth` / `useUserRole` (read Redux) |
| UI toggle | `redux/features/ui/uiSlice.js` |
| Imported image/lottie | `src/assets/` |
| favicon / og-image | `public/` |
| Gate a URL section | `src/proxy.js` matcher |
