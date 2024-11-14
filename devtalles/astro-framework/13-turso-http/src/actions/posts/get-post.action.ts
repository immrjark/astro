
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, exists, Posts } from "astro:db";

export const getPostLikes = defineAction({
  input: z.string(),
  handler: async (postID) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postID))

    if(!post) {
      return {likes: 0, exists: false}
    }
    
    return {
      likes: post.likes,
      exists: true
    }
  }
})