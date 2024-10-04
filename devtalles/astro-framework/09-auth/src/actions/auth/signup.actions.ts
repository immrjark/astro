import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const signupUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(13),
    remember_me: z.boolean().optional()

  }),
  handler: async ({email, name, password, remember_me}) => {
    console.log({email, name, password, remember_me});
    
    return true
  }
})