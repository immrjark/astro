import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";

export const signinUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async (input, context) => {

    // para las cookies
    const {email, name, password, remember_me} = input
    const {cookies} = context
    // console.log({email, name, password, remember_me});

    if(remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // esto es un año. 1 segundo * 60segundos del min * 60 min de la hora * 24 del día * 365 días del año
        path: '/', // el path para el cual es útil la cookie

      }) 
    } else {
        cookies.delete('email')
    }

    // para la creación de usuario
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth, 
        email, 
        password
      )
      // actualizar el nombre

      // verificar el correo

      return {
        uid: user.user.uid,
        email: user.user.email
      };

    } catch (error) {
      // console.log(error)
      const authError = error as AuthError;

      if(authError.code === 'auth/email-already-in-use')  {
        throw new Error('This user is already in use');
      }
      throw new Error('Help me');
      
    }
    
    return {ok: true, msg: 'User created'}
  }
})