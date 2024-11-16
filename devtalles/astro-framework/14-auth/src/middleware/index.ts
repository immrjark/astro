
import { firebase } from "@/firebase/config";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/private']
const notAuthinticatedRoutes = ['/login', '/sigin']

export const onRequest = defineMiddleware(async (context, next) => {

  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  context.locals.isLoggedIn = isLoggedIn;
  if(user) {
    context.locals.user = {// este lo he definido en el env.d.ts 
      avatar: user.photoURL ?? '',
      email: user.email!,
      name: user.displayName!,
      emailVerified: user.emailVerified
    }
  }

  if( !isLoggedIn && privateRoutes.includes(context.url.pathname)) {
    return context.redirect('/')
  }
  if(isLoggedIn && notAuthinticatedRoutes.includes(context.url.pathname)){
    return context.redirect('/')
  }

  return next()
});

