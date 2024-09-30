import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false; // porque es del lado del servidor sino no funciona

export const GET: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? ""; // puedo coger el nombre del id de los params porque es el nombre del archivo

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

  if (posts.length === 0) {
    const post = {
      id: postId,
      title: "Post not found",
      likes: null,
    };

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(posts.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const PUT: APIRoute = async ({ params, request }) => {
  const postId = params.id ?? ""; // puedo coger el nombre del id de los params porque es el nombre del archivo

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
  const { likes = 0 } = await request.json(); // esta es la cantidad de likes que tiene el post, que si no tiene ninguno es 0 by default

  if (posts.length === 0) {
    const newPost = {
      id: postId,
      title: "Post not found",
      likes: 0,
    };

    await db.insert(Posts).values(newPost);
    posts.push(newPost);
  }

  const post = posts.at(0)!;

  //para incrementar la cantidad de likes
  post.likes = post.likes + likes; // este último likes es el que viene de la request de arriba

  // grabar los likes en la base de datos
  await db.update(Posts).set(post).where(eq(Posts.id, postId)); // significa:

  return new Response("ok", { status: 200 });
};
