# SNGULAR - test - lit-element
La app consume la API publica de Rick and Morty, muestra una lista paginada de personajes, permite abrir un modal con el detalle de cada personaje y administra una lista de favoritos persistida en `localStorage`.

La aplicacion incluye dos vistas principales:

- Inicio: listado general de personajes con busqueda y paginacion.
- Favoritos: listado de personajes guardados.

## Stack utilizado

- `Lit` y `lit-element` para los componentes web.
- `@lit/context` para compartir el estado de favoritos.
- `Vite` como bundler y servidor de desarrollo.
- `JavaScript` como lenguaje principal.
- `CSS` para estilos por componente.
- `localStorage` para persistir los favoritos.
- API publica de `Rick and Morty` como fuente de datos.

## Requisitos

- `Node.js` 18 o superior.
- `npm` instalado.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo con Vite.
- `npm run build`: genera la version de produccion en `dist/`.
- `npm run test`: script placeholder; actualmente no hay suite automatizada configurada.

## Funcionalidades principales

- Listado de personajes con paginacion.
- Busqueda por nombre con debounce.
- Modal con detalle de personaje seleccionado.
- Agregar y quitar personajes favoritos.
- Manejo de estados de carga, error y vacio.
- Navegacion por rutas usando `history.pushState`.

## Estructura del proyecto

```txt
.
|-- index.html
|-- index.css
|-- package.json
|-- vercel.json
|-- app/
|   |-- main.js
|   |-- router/
|   |   |-- app-root.js
|   |   `-- app-router.js
|   |-- service/
|   |   |-- api.js
|   |   `-- characters.service.js
|   |-- store/
|   |   |-- favorites-context.js
|   |   `-- favorites-store.js
|   |-- normalize/
|   |   `-- list-characters-normalize.js
|   |-- pages/
|   |   |-- home-page/
|   |   |   |-- home-page.js
|   |   |   |-- home-page.css.js
|   |   |   `-- components/
|   |   `-- favorite-page/
|   |       |-- favorite-page.js
|   |       |-- favorites-page.css.js
|   |       `-- components/
|   |-- components/
|   |   |-- characters/
|   |   `-- ui/
|   `-- styles/
`-- README.md
```
