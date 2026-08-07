# Admin server

Micro servidor que expone `POST /add-post` y actualiza `data/posts.json` en un repo GitHub usando un token seguro provisto al servidor vía `GITHUB_TOKEN`.

Uso:

1. Copiar `.env.example` a `.env`.
2. Establecer `GITHUB_TOKEN` con un token con permisos `repo`.
3. (Opcional) Ajustar el usuario administrador en `.env` o usar las credenciales por defecto.
4. `cd server && npm install`.
5. `npm start`

Credenciales de ejemplo por defecto:

- Usuario: `editor`
- Contraseña: `svo1234`

Endpoint de login:

`POST /login`

Body JSON esperado para login:

{
  "username": "editor",
  "password": "svo1234"
}

Respuesta esperada:

{
  "token": "...",
  "username": "editor",
  "expiresIn": 3600000
}

Posteriormente, publica el post con el token usando el endpoint:

`POST /add-post`

Body JSON esperado:

{
  "owner": "usuario",
  "repo": "svo-ambiental",
  "post": { "title": "...", "excerpt":"...", "url":"posts/...","date":"2026-08-07" }
}

La UI `admin.html` ya usa este login y envía el token automáticamente al servidor.
