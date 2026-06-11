# Site Registry - Mediweb / Dr. Ricardo Cruz

Este registro acompana `docs/decisions.md`. Su funcion es dar a cualquier agente un mapa rapido de toda la web: paginas, responsabilidades, datos, scripts, SCSS y assets. Actualizarlo cuando se agregue, elimine o renombre una pagina, data source, plugin o seccion estructural.

## Fuentes Canonicas

- Memoria de decisiones: `docs/decisions.md`.
- Entrada para agentes: `AGENTS.md`.
- Proyecto real: `C:\Users\JEREMY\Desktop\mediweb`.
- Fuente puente: `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\propuesta`.
- SCSS puente: `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\assets\scss`.
- No usar como referencia: `index-2.html`.

## Mapa De Paginas

| Ruta | Rol | Estado / uso |
|---|---|---|
| `index.html` | Home | Pagina principal. Hero, procedimientos, doctor, resultados, FAQ/proceso, testimonios, blog, contacto y footer. |
| `dr-ricardo-cruz.html` | Doctor | Perfil del doctor. Usa breadcrumb, imagen/firma/credenciales, CTA y footer. |
| `resultados.html` | Resultados | Resultados antes/despues. Usa `assets/data/resultados-before-after.json`. |
| `blog.html` | Blog listado | Listado de articulos y cards de blog. |
| `contacto.html` | Contacto | Contacto, sedes/branches, mapa y formulario. Pendiente: title heredado de template. |
| `procedimientos/rinoplastia.html` | Procedimiento | Hero, casos JSON, contenido, resultados, formulario y galeria social. |
| `procedimientos/mamoplastia-aumento.html` | Procedimiento | Hero, casos JSON, contenido, resultados, formulario y galeria social. |
| `procedimientos/lipoescultura.html` | Procedimiento | Hero, casos JSON, contenido, resultados, formulario y galeria social. |
| `procedimientos/cirugia-facial.html` | Procedimiento | Pagina copiada desde base de procedimiento. Revisar copy/titulo para que no herede rinoplastia. |
| `blog/que-tener-en-cuenta-antes-de-una-rinoplastia.html` | Blog detalle | Articulo individual. |
| `blog/resultados-naturales-planificacion.html` | Blog detalle | Articulo individual. |
| `blog/cuidados-despues-de-una-cirugia-estetica.html` | Blog detalle | Articulo individual. |

## Layout Compartido

- Header desktop: aparece al inicio de todas las paginas HTML.
- Mobile menu: aparece cerca del cierre de todas las paginas HTML.
- Footer: bloque `rts footer area` compartido por paginas raiz, procedimientos y blog.
- Preloader: debe ir inmediatamente despues de `<body>` y usar `assets/images/fav2.svg` con ruta relativa correcta.
- Back/progress area: bloque de progreso al final de las paginas.
- CSS comun cargado por todas las paginas: `assets/css/plugins/plugins.css`, `assets/css/plugins/magnifying-popup.css`, `assets/css/vendor/bootstrap.min.css`, `assets/css/style.css`.

## Paginas Raiz

- `index.html`: home principal. Incluye hero slider, procedimientos principales, sobre el doctor, resultados/home gallery, proceso FAQ, testimonios, blog y contacto.
- `dr-ricardo-cruz.html`: perfil del doctor. Depende de `assets/scss/elements/doctors.scss`, breadcrumb y shared styles.
- `resultados.html`: resultados antes/despues. Usa `data-module-action="before-after-results"` y `assets/data/resultados-before-after.json`.
- `blog.html`: listado de articulos. Usa cards y botones de blog.
- `contacto.html`: contacto, sedes/branches, mapa y formulario.

## Procedimientos

Todas las paginas de `procedimientos/` comparten esta estructura base:

- Hero `procedure-hero-slider` con `mySwiper-banner-eight`.
- Carrusel de casos `service-wide-showcase` con `data-module-action="service-wide-cases"`.
- Contenido principal del procedimiento.
- Galeria/instagram final gobernada por `assets/scss/elements/_procedure.scss`.
- Plugins: `service-wide-showcase.js`, `procedure-approach-tabs.js`, `comparison-slider.js`, `procedure-results-carousel.js`, `transformations-showcase.js`, `whatsapp-form.js`.

Data sources por procedimiento:

- `procedimientos/rinoplastia.html` -> `assets/data/casos/rinoplastia.json`.
- `procedimientos/mamoplastia-aumento.html` -> `assets/data/casos/mamoplastia-aumento.json`.
- `procedimientos/lipoescultura.html` -> `assets/data/casos/lipoescultura.json`.
- `procedimientos/cirugia-facial.html` -> `assets/data/casos/cirugia-facial.json`.

## Blog

- `blog.html` es el listado principal.
- Detalles actuales:
  - `blog/que-tener-en-cuenta-antes-de-una-rinoplastia.html`.
  - `blog/resultados-naturales-planificacion.html`.
  - `blog/cuidados-despues-de-una-cirugia-estetica.html`.
- Los detalles usan estructura de breadcrumb + contenido de blog + footer.

## SCSS

Entrada de compilacion:

```txt
assets/scss/style.scss -> assets/css/style.css
```

Comandos:

```txt
npm run sass
npm run sass:watch
npm run watch
```

Imports actuales en `assets/scss/style.scss`:

```txt
default/variables
default/typography
default/spacing
default/reset
default/forms
default/mixins
default/shortcode
default/animations
default/text-animation
default/cursor
elements/header
elements/nav
elements/side_bar
elements/mobile-menu
elements/social
elements/button
elements/banner
elements/select
elements/backtotop
elements/service
elements/about
elements/portfolio
elements/appoinment
elements/pricing
elements/team
elements/blog
elements/awards
elements/branch
elements/common
elements/dropdown
elements/table
elements/counter
elements/niceselect
elements/before_after
elements/testimonials
elements/labtest
elements/faq
elements/feature
elements/video
elements/doctors.scss
elements/breadcrumb
elements/large-video
elements/footer
elements/health-package
elements/contact
elements/procedure
elements/preloader
propuesta/shared
propuesta/home
propuesta/procedimientos
propuesta/resultados
propuesta/blog
propuesta/contacto
```

Responsabilidades rapidas:

- `assets/scss/default/**`: variables, tipografia, reset, spacing, mixins, animaciones y base.
- `assets/scss/elements/**`: piezas reutilizables y secciones heredadas del template.
- `assets/scss/propuesta/**`: adaptacion especifica Mediweb desde el puente.
- `assets/scss/elements/_breadcrumb.scss`: breadcrumbs y fondos.
- `assets/scss/elements/doctors.scss`: pagina Dr Ricardo Cruz.
- `assets/scss/elements/_procedure.scss`: elementos de procedimientos e instagram strip.
- `assets/scss/elements/_preloader.scss`: preloader.
- `assets/scss/propuesta/_home.scss`: home.
- `assets/scss/propuesta/_procedimientos.scss`: heroes y layout de procedimientos.
- `assets/scss/propuesta/_resultados.scss`: resultados.
- `assets/scss/propuesta/_blog.scss`: blog/listado/articulos.
- `assets/scss/propuesta/_contacto.scss`: contacto.

## JavaScript

JS principal: `assets/js/main.js`.

Plugins relevantes:

| Plugin | Responsabilidad |
|---|---|
| `service-wide-showcase.js` | Carruseles de casos por procedimiento, con data JSON. |
| `before-after-results.js` | Render de resultados antes/despues en `resultados.html`. |
| `procedure-results-carousel.js` | Carrusel de resultados dentro de procedimientos. |
| `procedure-approach-tabs.js` | Tabs/enfoques de procedimientos. |
| `home-results-showcase.js` | Resultados en home. |
| `whatsapp-form.js` | Flujo de formulario/WhatsApp. |
| `proposal-gsap.js` | Animaciones de la propuesta/base Mediweb. |
| `comparison-slider.js` | Comparadores antes/despues. |
| `transformations-showcase.js` | Showcase de transformaciones. |

Reglas vigentes:

- Sliders y paginaciones deben inicializarse por contenedor, no con selectores globales.
- `.mySwiper-banner-eight` ya se inicializa por cada slider y `loop` solo corre con mas de dos slides.
- `.rts-testimonials-area` ya usa dots/flechas scoped por seccion.
- Si se edita JS, validar con `node --check` sobre el archivo tocado.

## Data JSON

| Archivo | Uso |
|---|---|
| `assets/data/resultados-before-after.json` | Resultados antes/despues en `resultados.html`. |
| `assets/data/casos/rinoplastia.json` | Casos del carrusel de rinoplastia. |
| `assets/data/casos/mamoplastia-aumento.json` | Casos del carrusel de mamoplastia. |
| `assets/data/casos/lipoescultura.json` | Casos del carrusel de lipoescultura. |
| `assets/data/casos/cirugia-facial.json` | Casos del carrusel de cirugia facial. Revisar contenido, parece minimo. |

Reglas:

- No duplicar casos en HTML si ya existe data source.
- Si un carrusel no pinta, revisar atributo `data-cases-src`, base path, JSON y assets asociados.
- `cirugia-facial.json` esta muy pequeno frente a los otros; revisar si se esperan mas casos.

## Assets Por Carpeta

Carpetas principales bajo `assets/images/`:

```txt
about
appoinment
banner
before-after
blog
branch
brand
breadcrumb
cardiology
cirugia-corporal
cirugia-facial
contact
counter
descarga
feature
health-package
lab
lipoescultura
logo
mamoplastia-aumento
menu
portfolio
procedure
rinoplastia
service
social
social-media
success
team
testimonials
video
```

Notas:

- Assets recientemente incorporados: `assets/images/banner/figma-hero-surgery-3.png` y `assets/images/rinoplastia/figma-nose-reshaping.png`.
- Para assets con nombres raros, preferir renombrar con sentido y ubicar en la carpeta semantica correcta.
- Antes de corregir CSS, validar que el asset apuntado exista.

## Pendientes Conocidos

- `contacto.html` conserva un `<title>` heredado de plantilla: revisar y cambiar a titulo final del sitio.
- `procedimientos/cirugia-facial.html` parece conservar title/copy de rinoplastia en partes del hero; revisar contra el puente.
- `assets/data/casos/cirugia-facial.json` mide muy poco; parece incompleto si la pagina debe mostrar casos reales.
- Mantener `docs/decisions.md` y este registro sincronizados cuando cambien estructura, rutas, JS, SCSS o data.

## Verificacion Recomendada

- SCSS: `npm run sass`.
- JS principal: `node --check assets/js/main.js`.
- Plugins editados: `node --check assets/js/plugins/<plugin>.js`.
- Busqueda de referencias heredadas: `rg "index-2|Medical & Health Care|template" -g "*.html" .`.
- Revision visual: desktop y mobile contra el puente cuando se toque una seccion visual.