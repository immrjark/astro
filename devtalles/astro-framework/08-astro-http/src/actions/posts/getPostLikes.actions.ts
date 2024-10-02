import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts, eq } from "astro:db";

export const getPostLikes = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (postId) => {
    // call a mailing service, or store to a databas
    //! SERVER ONLY
    // console.log({ server: true, success: true, postId: postId });

    // estas líneas son para retornar los likes del post que están en la db
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

    // return { success: true, postId: postId }; // es más fácil regresar objetos ya que luego si quieres expandirlos es más sencillo
    return {
      likes: posts.at(0)?.likes ?? 0,
    };
  },
});
