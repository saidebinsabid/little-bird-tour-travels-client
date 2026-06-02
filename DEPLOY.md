# Deploying the Frontend (Next.js) to Vercel

This folder is a self-contained repository. Push it on its own:

```bash
cd little-bird-tour-travels-client
git init
git add .
git commit -m "Initial client"
git branch -M main
git remote add origin <YOUR_CLIENT_REPO_URL>
git push -u origin main
```

`node_modules/`, `.next/` and `.env*.local` are git-ignored — only `.env.local.example` is committed.

## Vercel setup

> Deploy the **backend first**, get its URL, then deploy the frontend.

1. **Vercel → Add New → Project → import this repo.** Vercel auto-detects **Next.js** — no extra config needed.
2. Add **Environment Variables** (values from `.env.local.example`):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `/api` (keep as-is) |
| `BACKEND_URL` | your deployed backend URL, e.g. `https://little-bird-backend.vercel.app` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | your Cloudinary cloud name |
| `NEXT_PUBLIC_FIREBASE_*` | the 7 Firebase web-config keys |

3. **Deploy.**

## After deploying
- Go to the **backend** project and set its `CORS_ORIGINS` to this frontend's URL, then redeploy the backend.
- The browser only ever calls this site's own `/api/*`, which `next.config.mjs` proxies to `BACKEND_URL`. This keeps the login cookie first-party, so auth works across the two separate deployments.

## Notes
- Remote image hosts are whitelisted in `next.config.mjs` (`images.unsplash.com`, `res.cloudinary.com`, `lh3.googleusercontent.com`). Add more there if needed.
