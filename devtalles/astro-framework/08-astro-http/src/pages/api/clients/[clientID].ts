import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientID = params.clientID;
  const body = { method: "GET", clientID: clientID };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientID = params.clientID ?? "";
  // es buena práctica hacerlo en trycatch por si algo fallara
  try {
    const { id, ...body } = await request.json();
    // const body = { method: "POST" };

    // el where es siempre obligatorio en las Updates porque sino se sobreescribira todo y buuuuum ya está aquí la guerra
    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientID)); // el más es para que sea un number y haga match

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientID));

    return new Response(JSON.stringify(updatedClient), {
      // es normal que el POST sea 201
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ msj: "No body found" }), {
      // es normal que el POST sea 201
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientID = params.clientID ?? "";
  const results = await db.delete(Clients).where(eq(Clients.id, +clientID));
  const { rowsAffected } = results;

  // si es true significa que hay un cliente que se borró
  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ msg: `Client with id ${clientID} not found` }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
};
