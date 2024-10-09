import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { signInWithEmailAndPassword, signOut, type AuthError } from 'firebase/auth';


export const logInUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(13),
    remember_me: z.boolean().optional().default(false)
  }),
  handler: async ( input, context) => {
    const {email, password, remember_me} = input
    const {cookies} = context
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

    try {
      const user = signInWithEmailAndPassword(firebase.auth, email, password)
      
      /*
      ! ojo no puedes devoler un user tal cual porque te un error de "Action handler returned invalid data. Handlers should return serializable data types like objects, arrays, strings, and numbers. Parse error: DevalueError: Cannot stringify arbitrary non-POJOs"
      por ende tiene que devolver un objeto
      */
      return {
        email: (await user).user.email
      };
    } catch (error) {
      const firebaseError = error as AuthError;
      if(firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('Email already exist')
      }
      console.log(error);
      throw new Error('You can not be login')
    }
  }
})