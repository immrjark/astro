import { defineCollection, reference, z } from "astro:content";

// esto es la difinición de la colección (https://docs.astro.build/en/guides/content-collections/) y el formato de Zod está aquí (https://zod.dev/?id=introduction)
// const blogCollection = defineCollection({
//   type: "content",
//   schema: z.object({
//     title: z.string(),
//     date: z.date(),
//     description: z.string(),
//     image: z.string(),

//     // Relation
//     author: z.string(),

//     // Relation
//     tags: z.array(z.string()),
//   }),
// });

/**
 * Cómo he tenido que cambiar el path relativo de las imágenes para que astro pudiera modificarlas,
 * tienes que cambiar la estructura del schema porque el image ya no es un string sino una image
 */
const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      // image: image(),
      // también se pueden hacer ciertas validaciones a esta imagen
      image: image().refine((img) => img.width < 1200, {
        message: "Image should be lower than 1200px",
      }),

      // Relation
      // author: z.string(), //no ralacionado
      author: reference("author"), // relacionado y sale automáticamente el author porque lo definí en las export const de aquí abajo

      // Relation
      tags: z.array(z.string()),

      //Boolean. AL ponerle falso, el draft por defecto no estará en este modo
      isDraft: z.boolean().default(false),
    }),
});

// Collection para los autores
const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

// es obligatorio pornerle el nombre de collections
export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
/**
 * y la información se va a grabar en el direcctorio con el cual hayas puesto ese nombre. En este caso el directorio
 * es 'blog' pero si fuera blogs, tendrías que ponerlo como blogs pero SIEMPRE dentro de la carpteda de content
 *
 */
