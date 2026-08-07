#!/usr/bin/env bash
# Demo: enviar un post al servidor admin local
# Uso: editar OWNER, REPO y exportar GITHUB_TOKEN en el servidor antes de ejecutarlo

OWNER="teteangarita"
REPO="svo-ambiental"
API="http://localhost:4000/add-post"

read -r -d '' POST_JSON <<'JSON'
{
  "title": "Entrada demo desde script",
  "excerpt": "Esta entrada fue añadida mediante el script de demostración.",
  "url": "posts/demo-script.html",
  "date": "2026-08-07",
  "icon": "<i class=\"ti ti-calendar-check\"></i>"
}
JSON

curl -s -X POST "$API" -H "Content-Type: application/json" -d "$(jq -n --arg owner "$OWNER" --arg repo "$REPO" --argjson post "$POST_JSON" '{owner:$owner,repo:$repo,post:$post}')"

echo
