import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/private']

export const onRequest = defineMiddleware(async (context, next) => {

  const authHeaders = context.request.headers.get('authorization') ?? '' // porque puede ser null
  if( privateRoutes.includes(context.url.pathname)) {

    if(authHeaders) {
      return next(); // solo dejará pasar al usuario si el header de 'authorization' existe
    }

    return checkLocalAuth(authHeaders, next)
  }

  return next()
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {

  if(authHeaders) {
    const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
    
    const decodedValue = atob(authValue).split(':'); // esto es para decodificar el authentication es decir, hayq ue hacerlo muy bien porque sino te hackean
    const [user, password] = decodedValue
    
    if( user === 'normalman' && password === 'brochetaspolloo'){
      return next()
    }
  }
  
  return new Response('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic real="Secure Area'
    }
  })
}