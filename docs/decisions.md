# Decisions - Mediweb / Dr. Ricardo Cruz

Este documento es la memoria canonica para agentes y humanos trabajando en esta build. Antes de cambiar HTML, SCSS, CSS, JS, datos o assets, leer este archivo. Si una decision tecnica, visual u operativa cambia, actualizar este documento en el mismo trabajo.

## 0. Regla De Uso Para Agentes

- Estado: vigente.
- Decision: este archivo reemplaza la memoria oral del proyecto.
- Archivo canonico: `docs/decisions.md`.
- Entrada corta para agentes: `AGENTS.md` apunta a este archivo.
- Registro completo del sitio: `docs/site-registry.md`.
- Arquitectura operativa: `docs/architecture.md`.
- Indice de documentacion: `docs/README.md`.
- Implicacion: no reconstruir contexto desde cero si la informacion ya esta aqui.
- Implicacion: no copiar decisiones de otros proyectos anteriores dentro de `docs/decisions.md`.

## 1. Proyecto Actual Y Ruta Real

- Estado: vigente.
- Proyecto objetivo: Mediweb / Dr. Ricardo Cruz.
- Ruta de trabajo real del usuario: `C:\Users\JEREMY\Desktop\mediweb`.
- Decision: esta carpeta es independiente y sera el repo nuevo de GitHub.
- Implicacion: no trabajar sobre un repositorio padre ni arrastrar archivos externos innecesarios.
- Implicacion: si una herramienta muestra otro `cwd`, confirmar que las ediciones se hagan en `C:\Users\JEREMY\Desktop\mediweb`.

## 2. Fuente Puente

- Estado: vigente.
- Fuente puente principal: `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\propuesta`.
- SCSS puente: `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\assets\scss`.
- Pagina de referencia inicial: `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\propuesta\index.html`.
- Decision: la carpeta `propuesta` ya no se trata como propuesta temporal; es la base estructural de este proyecto.
- Decision: `index-2.html` no se considera fuente valida.
- Implicacion: extraer informacion, estructura, SCSS, JS, datos y assets desde el puente, pero adaptar al proyecto actual sin romper nombres ni estructura base.
- Implicacion: la fuente puente puede tener errores; si una inconsistencia viene del puente, corregirla en el proyecto objetivo y registrar la decision.

## 3. Stack Real

- Estado: vigente.
- Decision: este frontend es HTML estatico con SCSS compilado a CSS. No es React, Next, Astro ni Tailwind.
- Evidencia: paginas `.html`, `assets/scss/style.scss`, `assets/css/style.css`, `assets/js/**`, `assets/images/**`.
- Implicacion: no introducir frameworks nuevos para resolver layout o contenido.
- Implicacion: los cambios deben respetar las clases existentes salvo pedido explicito de refactor.
- Implicacion: el navegador carga `assets/css/style.css`; si se edita SCSS, compilar CSS.

## 4. Comandos Locales

- Estado: vigente.
- Sass esta instalado localmente con npm.
- Scripts reales en `package.json`:

```txt
npm run sass
npm run sass:watch
npm run watch
```

- Entrada/salida:

```txt
assets/scss/style.scss -> assets/css/style.css
```

- Decision: usar los scripts locales, no Sass global.
- Decision: el usuario compila en terminal; cuando un agente cambia SCSS debe compilar o indicar claramente si no pudo compilar.
- Nota: Dart Sass muestra warnings por `@import`, `darken()` y funciones globales. No migrar a `@use` salvo tarea explicita porque cambiaria toda la arquitectura del SCSS.

## 5. Git Y GitHub

- Estado: vigente.
- Decision: esta carpeta se subira como proyecto nuevo a GitHub.
- `.gitignore` actual ignora:

```txt
node_modules/
origin/
.sass-cache/
*.css.map
assets/css/style.recompiled.css
mediweb-mirror-manifest.json
.DS_Store
Thumbs.db
```

- Decision: `origin/` se ignora porque contiene material puente o respaldo que no debe entrar al repo final.
- Implicacion: antes de commit/push, revisar que solo entre lo necesario del proyecto actual.

## 6. Paginas Actuales

- Estado: vigente.
- Paginas raiz:
  - `index.html`
  - `dr-ricardo-cruz.html`
  - `resultados.html`
  - `blog.html`
  - `contacto.html`
  - `service.html`
- Paginas de procedimientos:
  - `procedimientos/rinoplastia.html`
  - `procedimientos/mamoplastia-aumento.html`
  - `procedimientos/lipoescultura.html`
  - `procedimientos/cirugia-facial.html`
- Paginas de blog:
  - `blog/que-tener-en-cuenta-antes-de-una-rinoplastia.html`
  - `blog/resultados-naturales-planificacion.html`
  - `blog/cuidados-despues-de-una-cirugia-estetica.html`
- Decision: mantener estos nombres y rutas como base actual.
- Implicacion: si se elimina o renombra una ruta, actualizar nav desktop, mobile, footer, enlaces internos y este documento.

## 7. Politica De HTML

- Estado: vigente.
- Decision: conservar nombres de clases y estructura base siempre que sea viable.
- Decision: adaptar contenido y assets antes de rehacer markup.
- Decision: eliminar referencias heredadas que no pertenezcan al proyecto, especialmente enlaces a `index-2.html`.
- Decision vigente: cuando una card o seccion heredada necesita una version visual nueva, crear un modificador de clase en lugar de alterar la clase base si esta puede estar compartida.
- Implicacion: no crear una pagina paralela si la estructura actual se puede corregir.
- Implicacion: si una seccion del puente usa una clase existente, traerla con su SCSS/JS propietario en vez de inventar una nueva capa.

## 8. Politica De SCSS

- Estado: vigente.
- Fuente SCSS: `assets/scss/**`.
- Indice SCSS: `assets/scss/style.scss`.
- CSS servido: `assets/css/style.css`.
- Decision: editar SCSS, no `style.css` manualmente, salvo emergencia puntual.
- Decision: mantener `style.scss` como indice de imports.
- Estructura real:
  - `assets/scss/default/**`: variables, tipografia, reset, spacing, mixins y base del template.
  - `assets/scss/elements/**`: piezas reutilizables y secciones heredadas del template.
  - `assets/scss/propuesta/**`: reglas especificas de esta base Mediweb extraida del puente.
- Parciales de propuesta activos:
  - `assets/scss/propuesta/_shared.scss`
  - `assets/scss/propuesta/_home.scss`
  - `assets/scss/propuesta/_procedimientos.scss`
  - `assets/scss/propuesta/_resultados.scss`
  - `assets/scss/propuesta/_blog.scss`
  - `assets/scss/propuesta/_contacto.scss`
- Parciales puente ya incorporados o ajustados:
  - `assets/scss/elements/_breadcrumb.scss`
  - `assets/scss/elements/doctors.scss`
  - `assets/scss/elements/_procedure.scss`
  - `assets/scss/elements/_preloader.scss`
  - `assets/scss/elements/_footer.scss`
  - `assets/scss/elements/_team.scss`
- Decision vigente: `service.html` usa la variante `.single-service-area.service-card-healthio` definida en `assets/scss/elements/_service.scss`; no modificar `.single-service-area` global para cambios especificos de esa card.
- Implicacion: si falta estilo en una pagina, buscar primero el parcial propietario antes de crear otro archivo.
- Implicacion: no crear overrides globales genericos para resolver una sola seccion.

## 9. Politica Visual

- Estado: vigente.
- Direccion visual: sitio medico sobrio, limpio y editorial-clinico para Dr. Ricardo Cruz.
- Decision: conservar la paleta, tipografias y espaciados derivados del puente Mediweb/Ricardo Cruz.
- Decision: no volver a una plantilla generica ni a una propuesta visual distinta.
- Implicacion: comparar contra capturas del puente cuando haya dudas de tamanos, fondos, botones, cards, footer, hero o breadcrumbs.
- Implicacion: si una seccion se ve descuadrada, primero revisar si faltan SCSS/assets/JS del puente.

## 10. Assets

- Estado: vigente.
- Decision: traer la mayor cantidad de assets utiles desde el puente para evitar pedirlos uno por uno.
- Decision: cuando un asset llega con nombre raro, preferir renombrarlo con sentido o ubicarlo en la carpeta correcta.
- Decision: no romper rutas existentes sin actualizar HTML, SCSS, JS y datos relacionados.
- Assets relevantes incorporados recientemente:
  - `assets/images/banner/figma-hero-surgery-3.png`
  - `assets/images/rinoplastia/figma-nose-reshaping.png`
- Implicacion: antes de declarar que una seccion esta rota por CSS, validar que la imagen o video apuntado exista.

## 11. Datos JSON

- Estado: vigente.
- Decision: la pagina de resultados y carruseles de casos pueden depender de JSON.
- Datos activos:
  - `assets/data/resultados-before-after.json`
  - `assets/data/casos/rinoplastia.json`
  - `assets/data/casos/mamoplastia-aumento.json`
  - `assets/data/casos/lipoescultura.json`
  - `assets/data/casos/cirugia-facial.json`
- Implicacion: si un carrusel no muestra casos, revisar primero `data-cases-src`, `data-cases-base`, JSON y assets de cada caso.
- Implicacion: no hardcodear casos en HTML si el modulo ya esta preparado para JSON.

## 12. JavaScript

- Estado: vigente.
- JS principal: `assets/js/main.js`.
- Plugins propios/relevantes:
  - `assets/js/plugins/service-wide-showcase.js`: carruseles de casos de procedimientos.
  - `assets/js/plugins/before-after-results.js`: resultados antes/despues basados en data.
  - `assets/js/plugins/procedure-results-carousel.js`: carrusel de resultados de procedimiento.
  - `assets/js/plugins/procedure-approach-tabs.js`: tabs/enfoques de procedimientos.
  - `assets/js/plugins/home-results-showcase.js`: resultados en home.
  - `assets/js/plugins/whatsapp-form.js`: formulario/contacto por WhatsApp.
  - `assets/js/plugins/proposal-gsap.js`: animaciones de propuesta.
- Decision: no usar JS para resolver layout que pertenece a SCSS/HTML.
- Decision: los sliders deben inicializarse por contenedor, no con selectores globales que crucen flechas o dots entre secciones.
- Decision vigente: `.mySwiper-banner-eight` se inicializa por cada slider; `loop` solo se activa si hay mas de dos slides.
- Decision vigente: `.rts-testimonials-area` usa dots/flechas scoped a su seccion.
- Implicacion: si un slider falla, revisar que su inicializador no use `.swiper-pagination`, `.swiper-button-next` o `.swiper-button-prev` global sin limitarlo a su contenedor.

## 13. Header, Nav Y Footer

- Estado: vigente.
- Decision: header/nav/footer deben reflejar el sitio final, no una plantilla temporal.
- Decision: nav principal actual: Inicio, Dr Ricardo Cruz, Procedimientos, Resultados, Blog, Contacto.
- Decision: los dropdowns no deben enlazar a `index-2.html`.
- Decision: footer debe conservar estilo del puente: fondo claro, columnas, newsletter, copyright y links coherentes.
- Implicacion: cuando se agregue una pagina nueva, actualizar header desktop, menu mobile y footer.

## 14. Preloader

- Estado: vigente.
- Decision: el preloader esta activo con la estructura:

```html
<div class="loader-wrapper" aria-hidden="true">
  <div class="loader-mask"></div>
  <div class="loader">
    <span class="loader-ring"></span>
    <span class="loader-ring is-delayed"></span>
    <span class="loader-logo"><img src=".../fav2.svg" alt=""></span>
  </div>
</div>
```

- SCSS propietario: `assets/scss/elements/_preloader.scss`.
- Decision: el bloque debe ir inmediatamente despues de `<body>` en cada HTML.
- Implicacion: al crear una pagina nueva, copiar preloader con ruta relativa correcta para `fav2.svg`.

## 15. Breadcrumbs Y Fondos

- Estado: vigente.
- SCSS propietario: `assets/scss/elements/_breadcrumb.scss`.
- Shared de fondos: `assets/scss/propuesta/_shared.scss`.
- Decision: los breadcrumbs usan imagenes del puente y variables CSS por clase.
- Decision vigente: `.breadcrumb-dr-ricardo-cruz` apunta a `assets/images/banner/figma-hero-surgery-3.png`.
- Implicacion: si un breadcrumb no coincide con la referencia, revisar primero la clase de pagina y `--breadcrumb-image`.

## 16. Procedimientos

- Estado: vigente.
- Paginas activas: rinoplastia, mamoplastia de aumento, lipoescultura, cirugia facial.
- Decision: los procedimientos reutilizan estructura base y datos JSON de casos.
- Decision: la galeria tipo Instagram al final se gobierna por `assets/scss/elements/_procedure.scss` y assets en `assets/images/social-media/**`.
- Decision vigente: el hero de rinoplastia tiene 2 slides reales; el falso tercer estado venia de `loop: true` en Swiper global y se corrigio en `assets/js/main.js`.
- Implicacion: no agregar slides vacios para solucionar loop; primero corregir inicializacion scoped.

## 17. Resultados

- Estado: vigente.
- Decision: `resultados.html` se alimenta de `assets/data/resultados-before-after.json` cuando aplique.
- JS propietario: `assets/js/plugins/before-after-results.js`.
- Implicacion: si faltan resultados, revisar JSON, rutas de imagenes y contenedores esperados antes de duplicar HTML.

## 18. Pagina Dr Ricardo Cruz

- Estado: vigente.
- Decision: `dr-ricardo-cruz.html` debe usar la estructura visual del puente, no el layout roto de plantilla.
- SCSS importante: `assets/scss/elements/doctors.scss` y reglas compartidas de propuesta.
- Assets importantes: imagenes del doctor, firma, iconos sociales y breadcrumb.
- Implicacion: si credenciales, enfoque de trabajo o CTA se apilan mal, revisar si falta SCSS del puente antes de cambiar HTML.

## 19. Blog Y Contacto

- Estado: vigente.
- Decision: blog debe mantener cards y botones coherentes con variables del proyecto.
- Decision vigente: botones `Leer mas` usan icono celeste en estado normal y fondo degradado azul con texto/icono blanco en hover.
- Decision: contacto usa datos del doctor y flujo de WhatsApp/formulario.
- Implicacion: si un boton se ve distinto, revisar `assets/scss/elements/_button.scss`, `assets/scss/propuesta/_blog.scss` y variables.

## 20. Verificacion Minima

- Estado: vigente.
- Despues de cambios SCSS:
  - Ejecutar `npm run sass` o mantener `npm run watch` corriendo.
  - Confirmar que `assets/css/style.css` se actualizo.
- Despues de cambios JS:
  - Ejecutar `node --check assets/js/main.js` si se edito `main.js`.
  - Para plugins editados, ejecutar `node --check ruta/del/plugin.js`.
- Despues de cambios HTML/assets:
  - Revisar rutas relativas.
  - Buscar referencias rotas con `rg`.
  - Comparar seccion contra el puente si existe captura o HTML de referencia.
- Si se puede usar navegador local, revisar desktop y mobile.

## 21. Registro De Cambios Importantes

### 2026-06-10

- Se reemplazo este documento heredado de Trading On Wheels/Synox por decisiones reales de Mediweb / Dr. Ricardo Cruz.
- Se agrego `AGENTS.md` como entrada breve para agentes.
- Se documento la ruta real del proyecto en Desktop y la fuente puente en `D:\Newt\Ricardo Cruz\05-Mayo\ricardo-cruz-web\source-site\mediweb\propuesta`.
- Se documento que `index-2.html` no se considera fuente valida.
- Se documento el sistema SCSS actual: `default`, `elements` y `propuesta`.
- Se documento el uso real de Sass: `npm run sass`, `npm run sass:watch` y `npm run watch`.
- Se documento la correccion del hero slider de procedimientos: inicializacion por contenedor y loop solo con mas de dos slides.
- Se documento la correccion de dots/flechas en testimonios con scope por `.rts-testimonials-area`.
- Se documento el preloader activo y su estructura esperada.
- Se documento que los resultados/casos usan JSON en `assets/data/**`.
- Se ejecuto el registro documental de toda la web en `docs/site-registry.md` y se creo `docs/README.md`.

### Contexto previo consolidado

- Se copio data JSON desde el puente para resultados y casos por procedimiento.
- Se incorporaron assets faltantes para breadcrumb y rinoplastia.
- Se incorporaron SCSS faltantes para breadcrumbs, pagina del doctor, procedimientos, preloader y secciones de propuesta.
- Se eliminaron referencias a `index-2.html` en paginas migradas.
- Se ajustaron botones, cards, footer, hero doctor, blog, testimonios y carruseles siguiendo la referencia del puente.

### 2026-06-11

- Se agrego `docs/architecture.md` como mapa operativo para IAs y humanos.
- Se documento `service.html` como pagina heredada/laboratorio visual de servicios.
- Se creo la variante de card `.single-service-area.service-card-healthio` en `assets/scss/elements/_service.scss` para emular la card de Figma sin romper la base `.single-service-area`.
