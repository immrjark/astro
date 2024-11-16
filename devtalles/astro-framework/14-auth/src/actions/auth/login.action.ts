
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";



export const logIn = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({email, password, remember_me}, {cookies}) => {
    if(remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // la cookie dura 1 dia,
        path: '/',
      })
    } else {
      cookies.delete('email', {
        path: '/'
      })
    }

    try {
      const user = await signInWithEmailAndPassword( firebase.auth, email, password)

      return {
        uid:  user.user.uid,
        email: user.user.email
      }
    } catch (error) {
      const firebaseError = error as AuthError;
      
      if(firebaseError.code === 'auth/email-already-in-use')  {
        throw new Error('This user is already in use');
      }
      throw new Error('Something was wrong with login. Retry in few minuts.');
      
      
    }
  }
})