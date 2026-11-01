# Mauricio Vega (HiyorDev) — Backend Developer Portfolio

Sitio de portafolio estático (HTML5 + CSS3 + JavaScript puro) para Mauricio
Vega, estudiante de Ingeniería de Software enfocado en desarrollo backend.
Muestra bio, stack tecnológico y los proyectos fijados en su GitHub
(HiyorDev/PokeBirthday, HiyorDev/DocAi, HiyorDev/Movora).

Sin frameworks, sin Node, sin backend propio — corre desde archivos planos
y está listo para GitHub Pages.

## Estructura del proyecto

```
portfolio/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Ejecutar localmente

No requiere build. Puedes:

1. Hacer doble clic en `index.html` para abrirlo directo en el navegador, **o**
2. Servirlo localmente:

   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```

   Luego abre `http://localhost:8000` en tu navegador.

## Publicar en GitHub Pages

1. Crea un repositorio (por ejemplo `portfolio`) y sube el contenido de esta
   carpeta a la rama `main`:

   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<repo>.git
   git push -u origin main
   ```

2. En GitHub, ve a **Settings → Pages**.
3. En **Build and deployment**, elige `Deploy from a branch`, rama `main`,
   carpeta `/ (root)`.
4. Guarda. El sitio quedará publicado en
   `https://<tu-usuario>.github.io/<repo>/` en un par de minutos.

## Dónde editar cosas

| Qué cambiar | Dónde |
|---|---|
| Correo, LinkedIn | `index.html` → sección `#contact` (busca `mailto:` y los enlaces `contact-list__link`) |
| Bio / "Sobre mí" | `index.html` (texto en español) y `script.js` → objeto `translations.en` (texto en inglés) |
| Stack tecnológico | `index.html` → sección `#stack` (`<ul class="chip-list">` dentro de cada `.stack-group`) |
| Proyectos destacados | `script.js` → el array `projects` al inicio del archivo. Cada proyecto tiene textos bilingües (`description`, `overview`, `status` en `es`/`en`). Agrega un objeto con la misma forma para crear una tarjeta + modal de detalle automáticamente en ambos idiomas |
| Certificaciones | `index.html` → sección `#certifications`. Para agregar otra, copia un bloque `.cert-card` y pega dentro el `<div data-share-badge-id=...>` que te da Credly (el `<script>` de Credly ya está en la sección, no hace falta repetirlo) |
| Textos en español / inglés | `script.js` → objeto `translations` (`es` y `en`). Los elementos con `data-i18n="clave"` en `index.html` se traducen automáticamente |
| Colores / tema claro-oscuro | `style.css` → variables en `:root` (modo claro) y `:root[data-theme="dark"]` (modo oscuro) |
| Botón de tema (media luna) | `index.html` → `#themeToggle`; lógica en `script.js` (guarda la preferencia en `localStorage`) |
| Botón de idioma (ES/EN) | `index.html` → `#langToggle`; lógica en `script.js` (`initLanguage`/`applyLanguage`, guarda la preferencia en `localStorage` y por defecto detecta el idioma del navegador) |
| Título de la página / meta descripción | `index.html` → etiquetas `<title>` y `<meta name="description">` |

## Agregar un nuevo proyecto destacado

Abre `script.js` y agrega un objeto al array `projects`:

```js
{
  id: "id-unico",
  title: "Nombre del proyecto",
  status: "Active", // o "V1.0", "In development", etc.
  description: "Resumen de una línea que aparece en la tarjeta.",
  tags: ["Tecnología 1", "Tecnología 2"],
  url: "https://github.com/HiyorDev/tu-repo",
  overview: "Descripción más detallada mostrada en el modal.",
  tech: ["Lista", "completa", "de", "tecnologías"],
}
```

La tarjeta y el modal de detalle se generan automáticamente — no hace falta
tocar el HTML ni el CSS.

## Modo oscuro / claro

El botón con el ícono de media luna (arriba a la izquierda, fijo en toda la
página) alterna entre modo claro y oscuro. La preferencia se guarda en
`localStorage`, y si el usuario no ha elegido manualmente, la página respeta
la preferencia de su sistema operativo (`prefers-color-scheme`).

## Cambio de idioma (ES / EN)

El botón junto al de la media luna (arriba a la izquierda) alterna todo el
contenido de la página entre español e inglés, incluyendo las tarjetas y el
modal de proyectos. La preferencia se guarda en `localStorage`; si el
usuario no ha elegido manualmente, la página detecta el idioma del
navegador la primera vez.

## Animaciones

Las animaciones son sutiles e intencionales: aparición suave del hero al
cargar, revelado con desplazamiento y *stagger* al hacer scroll en tarjetas
y bloques de stack, subrayado animado en la navegación, un cursor
parpadeante en el bloque de código, y transiciones de escala/color en
botones e íconos. Todo se desactiva automáticamente si el usuario tiene
activado `prefers-reduced-motion`.

## Accesibilidad y rendimiento

- HTML semántico (`header`, `main`, `section`, `footer`, `nav`) en todo el sitio.
- Estados de foco visibles, un enlace "saltar al contenido" y un modal que
  atrapa el foco al abrirse y lo devuelve al cerrarse.
- Respeta `prefers-reduced-motion` — las animaciones se desactivan para
  quienes lo prefieran.
- Sin dependencias externas aparte de Google Fonts (JetBrains Mono + Inter);
  el sitio funciona totalmente offline si autoalojas esas dos fuentes.
