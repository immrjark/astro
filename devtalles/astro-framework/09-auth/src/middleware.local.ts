/**
 * Este archivo no funciona por el nombre del archivo, es solo una demostración
 * Explicación de los middlewares
 * https://docs.astro.build/en/guides/middleware/
 */
import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

// par asaber las rutas protegidas
const privateRoutes = ['/private']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {
  // console.log('Middleware executed');
  // console.log(context.url);

  const authHeaders = context.request.headers.get('authorization') ?? ''
  
  if (privateRoutes.includes(context.url.pathname)) {
    // esto siguiente lo comento porque he puesto el checkLocalAuth
    // if(authHeaders){
    //   return next()
    // }
    // return new Response('Auht Required', {
    //   status: 401,
    //   headers: {
    //     'WWW-Authenticate': 'Basic real="Secure Area"'
    //   }
    // })
    return checkLocalAuth(authHeaders, next)
  }

  return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
  if(authHeaders ) {
    const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
    const decodedValue = atob(authValue).split(':')
    const [user, password] = decodedValue
    
    if (user === 'mrjark' && password === 'admin2') {
      return next()
    }
  } 
  
  return new Response('Auht Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic real="Secure Area"'
    }
  })

}