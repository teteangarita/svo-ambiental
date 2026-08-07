# Admin server

Micro servidor que expone `POST /add-post` y actualiza `data/posts.json` en un repo GitHub usando un token seguro provisto al servidor vía `GITHUB_TOKEN`.

Uso:

1. Copiar `.env.example` y establecer `GITHUB_TOKEN`.
2. `cd server && npm install`.
3. `GITHUB_TOKEN=ghp_xxx npm start`.

Body JSON esperado:

{
  "owner": "usuario",
  "repo": "svo-ambiental",
  "post": { "title": "...", "excerpt":"...", "url":"posts/...","date":"2026-08-07" }
}
