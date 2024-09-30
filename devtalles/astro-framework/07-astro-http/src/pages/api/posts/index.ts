// Para el Restful API
// este archivo puede estar en la carpeta dentro de pages o no

import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false; //https://docs.astro.build/en/guides/integrations-guide/node/

export const GET: APIRoute = async ({ params, request }) => {
  const getPosts = await getCollection("blog");

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  // creación de un filtro a través del slug (queryParameters)
  if (slug) {
    const post = await getEntry("blog", slug);
    if (post) {
      return new Response(JSON.stringify(getPosts), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ msg: `Post ${slug} Not found` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(getPosts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
