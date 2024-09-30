// Para el Restful API
// este archivo puede estar en la carpeta dentro de pages o no

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: "Chema F",
    age: "27",
  };
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
