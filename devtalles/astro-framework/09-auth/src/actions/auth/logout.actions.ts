import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from 'astro:content';
import { signOut } from "firebase/auth";

export const logOutUser = defineAction({
  accept: 'json',
  // input: z.string(),
  handler: async (_, context) => {
    const {cookies} = context

    return await signOut(firebase.auth)
  }
})