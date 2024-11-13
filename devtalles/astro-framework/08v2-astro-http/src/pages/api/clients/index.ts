import type { APIRoute } from 'astro';


export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  
  const body = {
    method: 'GET'
  }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const POST: APIRoute = async ({ params, request }) => {
  
  const body = {
    method: 'POST'
  }
  return new Response(JSON.stringify(body), {
    status: 201, // suele ser 201 para señalar que el post de creo
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
