# Curso de DevTalles

Para inicializar instala los paquetes de Node con `npm i`

## Animaciones

- En 02-pokemonsStatic/src/pokemons/PokemonCard.astro la animación que tienen los pokemons es simplemente colocando un nombre a la transición, `` transition:name={`${name}-image`} ``, y con esto le haces saber que la imagen a la cual pinchas es la mismas que va después y por eso la transición. Ver más info en [este enlace](https://docs.astro.build/en/guides/view-transitions/#naming-a-transition)

## Paginaciones

- [Paginación estática](https://docs.astro.build/en/reference/api-reference/#paginate)

## Instalaciones

- [Astroicons](https://www.astroicon.dev/) `npx astro add astro-icon`
- [SolidJS](https://docs.astro.build/en/guides/integrations-guide/solid-js/) `npx astro add solid`
- [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) `bun astro add mdx` porque en el 04 he usado bun

## Utilities

- [Ruración de las ViewTransitions](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)
- Para la creación de blog y colecciones, [aquí](https://docs.astro.build/en/guides/content-collections/) y el esquema [zod](https://zod.dev/?id=introduction)

## Comments

### Hybrid vs Server Vs Static side

- Hybrid vs Server Vs Static side. Por defecto, Astro usa el modo 'static'. Y es perfecto para hacer documentaciones, blogs o cualquier contenido estático. El 'hybrid' es la combinación, tienes que poner en la parte que quieras que se renderice de parte del servidor, necitas tener este hybrid y `export const prerender = false;` en esa página. Ejm: index.astro. Y el 'server, es lo contrario al 'hybrid', todo se genera del lado del servidor y solo aquello que tenga el `export const prerender = true;` será del lado del cliente.
  Y si no sabes que hacer, lo mejor es dejarlo en hybrid.

### Diferencia entre PUT y PATCH:

- **PUT**: Impacta sobre la totalidad de los atributos del recurso. Cuando se utiliza PUT, se deben proporcionar todos los valores para todos los atributos del recurso, incluso aquellos que no desean cambiar.
- **PATCH**: Modifica uno o varios atributos del recurso, sin afectar los demás. Solo se especifican los valores de los atributos que desean modificarse.
