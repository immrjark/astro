import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/private']
const notPrivateRoute = ['/login', '/register']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {
  const {url, redirect ,locals} = context;

  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  if (user) {
    locals.user = {
      name: user.displayName!,
      email: user.email!,
      avatar: user.photoURL ?? '',
      emailVerified: user.emailVerified,
    }
  }

  // para pasar la info a otras pantallas
  locals.isLoggedIn = isLoggedIn;

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) { // esto quiere decir que si el user no está authen. y quiere entrar a una ruta protegida

    return redirect('/');
  };
  if (isLoggedIn && notPrivateRoute.includes(url.pathname)) { // dice que si está logged y quiere entrar a una ruta que hace falta que no lo esté
    return redirect('/');
  };

  return next();
});