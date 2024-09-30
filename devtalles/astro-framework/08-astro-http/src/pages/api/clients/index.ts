import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  // const body = { method: "GET" };
  const users = await db.select().from(Clients); //  esto es para obtener los clientes

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  // es buena práctica hacerlo en trycatch por si algo fallara
  try {
    const { id, ...body } = await request.json();
    // const body = { method: "POST" };

    const resp = await db.insert(Clients).values({
      ...body,
    });
    const { lastInsertRowid } = resp;

    return new Response(
      JSON.stringify({
        id: lastInsertRowid,
        ...body,
      }),
      {
        // es normal que el POST sea 201
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ msj: "No body found" }), {
      // es normal que el POST sea 201
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
};
