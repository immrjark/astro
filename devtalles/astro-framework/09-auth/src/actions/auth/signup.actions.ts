import { defineAction } from "astro:actions";
import { z } from "astro:content";

import { firebase } from "@/firebase/config";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";

export const signUpUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(13),
    remember_me: z.boolean().optional()

  }),
  handler: async (input , context) => {
    // console.log({email, name, password, remember_me});
    const {email, name, password, remember_me} = input;
    const {cookies} = context;
    // console.log({ email, name, password, remember_me});

    // COOKIES
    if (remember_me ) {
      cookies.set('email', email, {
        expires: new Date( Date.now() + 1000 * 60 * 60 * 24 * 365 ), // para uqe la cookie expire dentro de un año desde la fecha del ahora
        path: '/', // esto es para decirle qué path debe tener en cuenta la cookie y como quieres toda la app, le pones todo lo que empieze por '/' èro si solo quisieras la parte de /private pues pones eso tal cual
      })
    } else {
      cookies.delete('email', {
        path: '/'
      })
    }
    
    // USERS CREATIONS
    try { // siemrpe que algo puede salir mal, debe haber un trycatch
      const user = await createUserWithEmailAndPassword(firebase.auth , email, password) // con esto tienes la info del users
      
      // Actualizar el nombres (display name)

      // Verificar el corre

      return {
        uid: user.user.uid,
        email: user.user.email
      };

      //! ojo
      /**
       * si retorno un 'return user;' solamente me da error porque no lo ha podido pasar a formato json,
       * por tanto, tiene que deconstruirse y hacerse más pequeño y por ekemplo, devolver el id y el correo
       */

    } catch (error) {
      console.log(error);
      const firebaseError = error as AuthError
      if(firebaseError.code === 'auth/email-already-in-use') {
        throw new Error ('El correo ya está en uso')
      }

      throw new Error ('Auxilio! Creo que te has equivocado')
    }
    // return {ok: true, msg: 'User created'}
  }
})