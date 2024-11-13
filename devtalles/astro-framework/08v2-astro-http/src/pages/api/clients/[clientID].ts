import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

  const clientID = params.clientID
  
  const body = {
    method: 'GET',
    clientID: clientID,
  }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const PATCH: APIRoute = async ({ params, request }) => {
  const clientID = params.clientID
  
  const body = {
    method: 'PATCH',
    clientID: clientID,
  }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const DELETE: APIRoute = async ({ params, request }) => {
  const clientID = params.clientID
  
  const body = {
    method: 'DELETE',
    clientID: clientID,
  }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
