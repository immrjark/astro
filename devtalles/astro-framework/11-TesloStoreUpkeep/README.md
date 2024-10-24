# Astro store

## Instalación
1. Clonar repo
2. `bun i`
3. Clonar .env.template y renombrar a .env y user las variables
4. `bun dev`

## Otros
- Intalación para el manejo de las cookies `pnpm i js-cookie` con [js-cookie](https://www.npmjs.com/package/js-cookie)

## Comentarios interesantes

- Para que se den las view transition bonitas, necesitas tener varias cosas:
  1. En el Head más alto de la app el ` <ViewTransitions />`
  2. En cada uno de los scripts de las pantallas en las cuales navegues o crees navegación tienes que tener:
      - Envuelto en todo el script con `document.addEventListener("astro:page-load", () => { aquí dentro todo }`
      - Al final del script el `navigate('página donde quieras navergar empezando con el /')` e importarlo de `import { navigate } from "astro:transitions/client";`

- 