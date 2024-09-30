// este es un server action
import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const server = {
  getPostLikes: defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {
      // call a mailing service, or store to a databas
      //! SERVER ONLY
      console.log({ server: true, success: true, postId: postId });

      return { success: true, postId: postId }; // es más fácil regresar objetos ya que luego si quieres expandirlos es más sencillo
    },
  }),
};
