// este es un server action
// src/actions/index.ts
// import { defineAction } from "astro:actions";
// import { z } from "astro:content";
// import { db, Posts, eq } from "astro:db";
import { getPostLikes } from "./posts/getPostLikes.actions";
import { updatePostLikes } from "./posts/updatePostLikes.actions";

export const server = {
  // getPostLikes: defineAction({
  //   accept: "json",
  //   input: z.string(),
  //   handler: async (postId) => {
  //     const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

  //     // call a mailing service, or store to a database
  //     // console.log({ server: true, success: true, postId: postId });
  //     return {
  //       likes: posts.at(0)?.likes ?? 0,
  //     };
  //   },
  // }),
  getPostLikes,
  updatePostLikes,
};
