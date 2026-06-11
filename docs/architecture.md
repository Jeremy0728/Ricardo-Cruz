# Architecture - Mediweb / Dr. Ricardo Cruz

Este documento es una guia rapida para navegar y modificar la web sin reconstruir contexto desde cero. La memoria canonica sigue siendo `docs/decisions.md`; este archivo explica como esta organizada la arquitectura diaria del proyecto.

## Stack

- HTML estatico en archivos `.html`.
- SCSS en `assets/scss/**`.
- CSS compilado servido desde `assets/css/style.css`.
- JavaScript vanilla/jQuery/plugins del template en `assets/js/**`.
- No usar React, Next, Tailwind, Astro ni otro framework nuevo.

## Flujo De Edicion

1. Leer `docs/decisions.md`.
2. Ubicar la pagina HTML afectada.
3. Ubicar el parcial SCSS propietario antes de crear reglas nuevas.
4. Editar SCSS, no `assets/css/style.css` manualmente.
5. Compilar con `npm run sass`.
6. Si se edita JS, validar con `node --check`.
7. Actualizar `docs/decisions.md`, `docs/site-registry.md` o este archivo si cambia estructura, rutas, parciales o patrones.

## Capas Del Proyecto

| Capa | Ruta | Rol |
|---|---|---|
| Paginas | `*.html`, `procedimientos/*.html`, `blog/*.html` | Markup final servido por el navegador. |
| Base SCSS | `assets/scss/default/**` | Variables, tipografia, reset, spacing, forms, mixins y animaciones. |
| Elementos SCSS | `assets/scss/elements/**` | Componentes/secciones reutilizables del template y adaptaciones heredadas. |
| Propuesta SCSS | `assets/scss/propuesta/**` | Reglas especificas de la version Mediweb / Ricardo Cruz. |
| CSS compilado | `assets/css/style.css` | Salida de Sass. No editar a mano salvo emergencia. |
| JS | `assets/js/main.js`, `assets/js/plugins/**` | Inicializadores, sliders, formularios y modulos por data. |
| Data | `assets/data/**` | JSON de resultados y casos por procedimiento. |
| Assets | `assets/images/**` | Imagenes, logos, iconos, fondos y casos. |
| Docs | `docs/**` | Memoria operativa para humanos e IAs. |

## SCSS

Entrada de compilacion:

```txt
assets/scss/style.scss -> assets/css/style.css
```

Reglas:

- `assets/scss/style.scss` solo indexa imports.
- `assets/scss/elements/_service.scss` concentra cards y secciones de servicios del template.
- `assets/scss/elements/_breadcrumb.scss` gobierna breadcrumbs.
- `assets/scss/elements/_footer.scss` gobierna footer compartido.
- `assets/scss/elements/_procedure.scss` gobierna bloques de procedimientos y galeria social.
- `assets/scss/propuesta/_shared.scss` contiene ajustes compartidos de la base Ricardo Cruz.
- Crear modificadores de clase antes de alterar una clase global usada en varias paginas.

## Paginas Y Responsabilidades

| Ruta | Responsabilidad | SCSS principal |
|---|---|---|
| `index.html` | Home principal. | `propuesta/_home.scss`, elementos compartidos. |
| `dr-ricardo-cruz.html` | Perfil medico. | `elements/doctors.scss`, `propuesta/_shared.scss`. |
| `resultados.html` | Resultados antes/despues. | `propuesta/_resultados.scss`. |
| `blog.html` | Listado de articulos. | `propuesta/_blog.scss`. |
| `contacto.html` | Contacto, sedes y formulario. | `propuesta/_contacto.scss`, `elements/_contact.scss`. |
| `service.html` | Pagina heredada de servicios usada para explorar/armar variantes visuales. | `elements/_service.scss`. |
| `procedimientos/*.html` | Paginas de procedimientos con casos y carruseles. | `propuesta/_procedimientos.scss`, `elements/_procedure.scss`. |
| `blog/*.html` | Detalles de blog. | `propuesta/_blog.scss`. |

## Patron De Cards De Servicios

La clase base historica es:

```html
<div class="single-service-area">...</div>
```

No modificarla globalmente si solo se necesita una variante visual. Para `service.html` se creo la variante:

```html
<div class="single-service-area service-card-healthio">...</div>
```

Sub-elementos:

```txt
service-card-healthio__media
service-card-healthio__icon
service-card-healthio__body
service-card-healthio__link
```

La seccion usa el modificador:

```html
<div class="service-area service-area--card-variant ...">
```

Esto permite emular la card de Figma sin romper otros usos de `.single-service-area`.

## JavaScript Y Datos

- `assets/js/main.js` inicializa sliders y comportamiento general.
- Plugins propios viven en `assets/js/plugins/**`.
- Los sliders deben inicializarse por contenedor, no con selectores globales.
- Resultados y casos deben venir de JSON cuando el modulo ya existe.
- No usar JS para arreglar layout que pertenece a HTML/SCSS.

## Verificacion

Comandos recomendados:

```txt
npm run sass
node --check assets/js/main.js
rg "index-2|Medical & Health Care|template" -g "*.html" .
git status --short
```

Despues de cambios visuales, revisar desktop y mobile en navegador local si es posible.
