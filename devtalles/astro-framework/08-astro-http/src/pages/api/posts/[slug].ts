// Para el Restful API
// este archivo puede estar en la carpeta dentro de pages o no

import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

// el método GET es para obtener la data
export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  const post = await getEntry("blog", slug as any);

  if (!post) {
    return new Response(JSON.stringify({ msg: `Post ${slug} Not found` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// par ano tener que poner esta funcion aquí, como estás en modo 'hybrid' tienes que tener el prerender en false
// export const getStaticsPath: GetStaticPaths = async () => {
//   return [
//     {
//       params: { slug: "frist-slug" },
//     },
//   ];
// };

// el método POST es para crear la data
export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      method: "POST",
      ...body,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

// los PUT son utilizados para actualizar la data pero se tienen mandar TODOS LOS DATOS DE NUEVO
export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      method: "POST",
      ...body,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
// los PATCH es igual que el PUT pero aquí pueden enviar SOLO LA DATA CONCRETA QUE QUIERAS, sin tener que enviarla de nuevo toda.
export const PATCH: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      method: "PATCH",
      ...body,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

// el DELETE es para eliminar el contenido pero tienes que enviarle por lo general el slug como método identificativo
export const DELETE: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const { slug } = params;

  return new Response(
    JSON.stringify({
      method: "PATCH",
      slug: slug,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
