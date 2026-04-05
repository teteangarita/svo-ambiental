# Portal de Noticias "The Observer Block"

**Objetivo:** Implementar un portal de noticias de Minecraft con arquitectura estática (SPA Lite), consumiendo feeds RSS transformados a JSON, con estética pixel-art fiel a la GUI del juego, desplegable en GitHub Pages sin costo.

---

## Propuesta de Cambios

### Fase 1 — Estructura Base y Diseño

#### [NEW] `index.html`
Estructura semántica principal con:
- `<header>` con logo pixel-art, título y contador de visitas
- `<nav>` con categorías (Actualizaciones, Builds, Comunidad)
- `<main>` con grid de tarjetas de noticias (3 cols Desktop → 1 col Mobile)
- `<footer>` con créditos y estado de conexión
- Inclusión de Google Fonts (`VT323`) y vínculos a CSS/JS

#### [NEW] `css/style.css`
Sistema de diseño completo:
- **Variables CSS**: paleta de colores Minecraft (`--grass-green: #528033`, `--dirt-brown: #795548`, `--inventory-gray: #C6C6C6`)
- **Clases MC-GUI**: bordes pixel-art con `border-image`, botones con efecto bisel estilo inventario
- **Layout**: CSS Grid responsive con `Media Queries` (breakpoints: 768px, 480px)
- **Tipografía**: `VT323` primaria, `monospace` como fallback
- **`image-rendering: pixelated`** en todos los assets

---

### Fase 2 — Lógica JavaScript

#### [NEW] `js/app.js`
Lógica de noticias:
- `fetchNews(feedUrl)`: Fetch asíncrono al endpoint `api.rss2json.com`
- `renderArticles(items)`: Template literals para inyección dinámica al DOM
- `showErrorBlock()`: Muestra bloque "Connection Lost" si el feed falla
- Event listener en `DOMContentLoaded` para iniciar la carga

**Endpoint RSS:** `https://api.rss2json.com/v1/api.json?rss_url=https://www.minecraft.net/en-us/feeds/site-rss.xml`

#### [NEW] `js/counter.js`
Lógica del contador de visitas:
- Fetch a `CountAPI` en `DOMContentLoaded`
- Actualiza el elemento del DOM con el número de visitas
- **Fallback:** Muestra `"128+"` si la API no responde

**Endpoint:** `https://api.countapi.xyz/hit/[NAMESPACE]/visits`

---

### Fase 3 — Assets Visuales

#### [NEW] `assets/img/`
Texturas pixel-art requeridas:
- `dirt.png` — textura de tierra (fondo de tarjetas y error block)
- `stone.png` — textura de piedra (fondo de header/nav)
- `grass_border.png` — borde de 16×16px para `border-image`

#### [NEW] `assets/icons/`
- `favicon.ico` — ícono del sitio (creeper face o bloque)
- `sword_cursor.png` — puntero personalizado (opcional)

---

## Estructura Final de Archivos

```text
pagina-web/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── counter.js
└── assets/
    ├── img/
    │   ├── dirt.png
    │   ├── stone.png
    │   └── grass_border.png
    └── icons/
        ├── favicon.ico
        └── sword_cursor.png
```

---

## Preguntas Abiertas

> [!IMPORTANT]
> **¿Qué feed RSS debe usarse?**  
> El TD menciona `minecraft.net`. ¿Se debe usar el feed oficial de Minecraft, o hay otro portal/blog en mente?

> [!WARNING]
> **CountAPI está discontinuada** (shutdown en 2023). Se recomienda reemplazarla con una alternativa:
> - `countapi.dev` (fork comunitario)
> - `hits.sh` o `visitor-badge.io`
> - Un simple `localStorage` counter (sin backend, solo local)
> ¿Cuál prefieres usar?

> [!NOTE]
> **Assets de texturas**: ¿Tienes las texturas pixel-art propias (dirt.png, grass_border.png, etc.) o debo generarlas usando la herramienta de imagen de IA?

---

## Plan de Verificación

### Local
1. Abrir `index.html` con Live Server (VS Code)
2. Verificar que el grid responsive colapsa correctamente en Mobile
3. Comprobar que las tarjetas de noticias se renderizan con datos del RSS
4. Simular fallo de API para verificar el bloque "Connection Lost"

### QA Multi-Navegador
- Chrome DevTools (Desktop + Mobile emulator)
- Firefox
- Safari Mobile (si está disponible)

### Deploy
- Push al repositorio GitHub
- Activar GitHub Pages desde rama `main` o carpeta `/docs`
- Verificar HTTPS y carga correcta de assets

---

## Orden de Ejecución Propuesto

| # | Tarea | Archivo |
|---|-------|---------|
| 1 | Crear estructura de carpetas | — |
| 2 | Diseño base y variables CSS | `css/style.css` |
| 3 | Estructura HTML semántica | `index.html` |
| 4 | Lógica de noticias RSS | `js/app.js` |
| 5 | Contador de visitas | `js/counter.js` |
| 6 | Generar/añadir assets | `assets/` |
| 7 | Pruebas locales | — |
| 8 | Deploy en GitHub Pages | — |
