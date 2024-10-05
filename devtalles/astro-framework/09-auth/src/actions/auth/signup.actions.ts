import { defineAction } from "astro:actions";
import { z } from "astro:content";

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
    console.log({ email, name, password, remember_me});

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
    
    
    return {ok: true, msg: 'User created'}
  }
})