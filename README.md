## Mock API (Netlify + json-server)

Netlify does **not** run long-lived Node processes (so `npx json-server db.json` won't stay up).
This project exposes `db.json` through a **Netlify Function** that runs `json-server`.

### Routes

- `GET /api/` health
- `GET /api/<resource>`
  - Example: `GET /api/posts`
  - Example: `GET /api/posts/1`

### Local dev

Run plain json-server:

```bash
npm i
npm run mock
```

Or run through Netlify (recommended, matches production):

```bash
npm i
npm run dev
```

### Deploy (Netlify)

1. Push this repo to GitHub/GitLab.
2. Create a new site on Netlify from the repo.
3. No build command is required; Netlify will install dependencies and deploy functions.

Your API base URL will be:
`https://<your-site>.netlify.app/api`


