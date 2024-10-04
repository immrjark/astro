/**
 * Explicación de los middlewares
 * https://docs.astro.build/en/guides/middleware/
 */
import { defineMiddleware } from "astro:middleware";

// par asaber las rutas protegidas
const privateRoutes = ['/private']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {
  // console.log('Middleware executed');
  // console.log(context.url);

  const authHeaders = context.request.headers.get('authorization')
  
  if (privateRoutes.includes(context.url.pathname)) {
    if(authHeaders){
      return next()
    }
    return new Response('Auht Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic real="Secure Area"'
      }
    })
  }

  return next();
});